// Screen switching
function switchScreen(name) {
  const cur = document.querySelector('.screen.active');
  const nxt = document.getElementById('screen-' + name);
  if (cur === nxt) return;
  if (cur) { cur.classList.add('exit'); setTimeout(() => cur.classList.remove('active','exit'), 340); }
  setTimeout(() => {
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + name).classList.add('active');
    nxt.scrollTop = 0; nxt.classList.add('active');
    animateScreen(nxt);
  }, cur ? 130 : 0);
}
function animateScreen(sc) {
  const els = sc.querySelectorAll('.vwrap,.sos,.fgrid,.dc,.rstrip,.fscroll,.tscroll-wrap,.pcard,.vcard,.emacts,.bmic,.foodc,.diet-log,.bloodc,.sleepc,.reml,.hosp-card,.insc,.govtr,.rxl,.upload-zone,.apptc,.pbanner,.pinfo,.ssteps,.w-hdr,.rc-hdr,.hdr,.slbl');
  els.forEach((el,i) => {
    el.style.opacity='0'; el.style.transform='translateY(15px)';
    el.style.transition=`opacity 0.4s ease ${i*0.055}s,transform 0.4s cubic-bezier(0.4,0,0.2,1) ${i*0.055}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='none'; }));
  });
}
// Modals
function openModal(id) {
  document.getElementById(id).classList.add('open');
  if (id === 'm-call') { setTimeout(() => { document.getElementById('call-status').textContent = 'Connected • 0:01'; }, 1500); }
}
function forceClose(id) { document.getElementById(id).classList.remove('open'); }
function closeModal(e, id) {
  if (!e || e.target === document.getElementById(id)) forceClose(id);
}
// BMI
function calcBMI() {
  const h = parseFloat(document.getElementById('bmi-h').value);
  const w = parseFloat(document.getElementById('bmi-w').value);
  if (!h || !w) return;
  const bmi = (w / ((h/100)**2)).toFixed(1);
  document.getElementById('bmi-result').textContent = bmi;
  const cat = document.getElementById('bmi-cat');
  if (bmi < 18.5) { cat.textContent='Underweight'; cat.style.cssText='background:var(--bd);color:var(--blue);font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px'; }
  else if (bmi < 25) { cat.textContent='Normal ✓'; cat.style.cssText='background:var(--gd);color:var(--green);font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px'; }
  else if (bmi < 30) { cat.textContent='Overweight'; cat.style.cssText='background:var(--ad);color:var(--amber);font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px'; }
  else { cat.textContent='Obese ⚠️'; cat.style.cssText='background:var(--rd);color:var(--red);font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px'; }
}
// BP
function checkBP() {
  const sys = parseInt(document.getElementById('bp-sys').value);
  const dia = parseInt(document.getElementById('bp-dia').value);
  if (!sys || !dia) return;
  document.getElementById('bp-result').style.display = 'flex';
  document.getElementById('bp-val').textContent = sys+'/'+dia;
  const st = document.getElementById('bp-status');
  if (sys < 120 && dia < 80) { st.textContent='Normal ✓'; st.style.color='var(--green)'; }
  else if (sys < 130) { st.textContent='Elevated'; st.style.color='var(--amber)'; }
  else { st.textContent='High ⚠️'; st.style.color='var(--red)'; }
}
// Food scanner
function scanFood() {
  const box = document.getElementById('scan-box');
  box.innerHTML='<div style="font-size:24px">⏳</div><div style="font-size:12px;color:var(--green);font-weight:600">Scanning...</div>';
  setTimeout(() => {
    box.innerHTML='<div style="font-size:24px">✅</div><div style="font-size:12px;color:var(--green);font-weight:600">Scan complete!</div>';
    const res = document.getElementById('food-res');
    res.style.display='block'; res.style.opacity='0'; res.style.transform='translateY(10px)'; res.style.transition='all 0.4s ease';
    setTimeout(() => { res.style.opacity='1'; res.style.transform='none'; }, 50);
  }, 1400);
}
// Diet log
function addMeal() {
  const list = document.getElementById('meal-list');
  const meal = document.createElement('div');
  meal.className = 'meal-row';
  meal.innerHTML = '<div class="meal-ic" style="background:var(--pd)">🌆</div><div><div class="meal-nm">Dinner</div><div class="meal-time">8:00 PM • Roti, Dal, Salad</div></div><div class="meal-cal">380 kcal</div>';
  meal.style.opacity='0'; meal.style.transform='translateY(10px)'; meal.style.transition='all 0.4s ease';
  list.appendChild(meal);
  setTimeout(() => { meal.style.opacity='1'; meal.style.transform='none'; }, 50);
}
// Sleep bars
function buildSleep() {
  const data=[6.5,7.2,5.8,8.0,6.0,7.5,6.5], max=9;
  const wrap = document.getElementById('sleep-bars');
  if (!wrap) return;
  data.forEach((v,i) => {
    const bar = document.createElement('div');
    bar.className = 'sbar' + (i===6?' hi':'');
    bar.style.height='4px'; bar.style.transition=`height 0.65s cubic-bezier(0.4,0,0.2,1) ${i*0.09}s`;
    wrap.appendChild(bar);
    setTimeout(() => { bar.style.height=(v/max*100)+'%'; }, 200);
  });
}
// Cal fill bar
function animateCalBar() {
  setTimeout(() => { const el = document.getElementById('cal-fill'); if(el) el.style.width='69%'; }, 400);
}
// Heart rate counter
function countUp(el, to, dur) {
  let s=null;
  const step = ts => { if(!s)s=ts; const p=Math.min((ts-s)/dur,1); el.textContent=Math.floor(p*to); if(p<1)requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
// Upload mock
function uploadReport() {
  const prev = document.getElementById('upload-preview');
  if (prev.style.display === 'flex') return;
  prev.style.display='flex'; prev.style.opacity='0'; prev.style.transition='opacity 0.4s ease';
  setTimeout(() => { prev.style.opacity='1'; }, 50);
}
// WA send
function sendWA(btn) {
  btn.textContent='✅ Alert Sent!';
  btn.style.background='linear-gradient(135deg,#128c3e,#0a5c28)';
  setTimeout(() => forceClose('m-wa'), 1200);
}
// Mic toggle
function toggleMic(el) { el.textContent = el.textContent==='🎤'?'🔇':'🎤'; }
// Appointment
function selectDoc(el) { document.querySelectorAll('.doc-opt').forEach(d=>d.classList.remove('sel')); el.classList.add('sel'); }
function selectSlot(el) { if(el.classList.contains('na')) return; document.querySelectorAll('.slot').forEach(s=>s.classList.remove('sel')); el.classList.add('sel'); }
function bookAppt(btn) {
  btn.textContent = '✅ Appointment Booked!';
  btn.style.background = 'linear-gradient(135deg,var(--green),#00a870)';
  setTimeout(() => forceClose('m-book'), 1400);
}
// Tip player
let tipPlaying=false, tipInterval=null, tipSecs=0;
function toggleTip() {
  tipPlaying = !tipPlaying;
  const btn=document.getElementById('tip-play');
  const ctrl=document.querySelectorAll('.tip-ctrl')[1];
  btn.textContent = tipPlaying?'⏸':'▶️';
  if(ctrl) ctrl.textContent = tipPlaying?'⏸':'▶️';
  if (tipPlaying) {
    tipInterval = setInterval(() => {
      tipSecs++; if(tipSecs>=300){clearInterval(tipInterval);tipPlaying=false;return;}
      const pct = (tipSecs/300*100).toFixed(1);
      document.getElementById('tip-prog').style.width=pct+'%';
      const m=Math.floor(tipSecs/60), s=tipSecs%60;
      document.getElementById('tip-time').textContent=`${m}:${s<10?'0'+s:s} / 5:00`;
    },1000);
  } else { clearInterval(tipInterval); }
}
// Init
window.addEventListener('load', () => {
  buildSleep(); animateCalBar();
  animateScreen(document.getElementById('screen-home'));
  setTimeout(() => { const el=document.getElementById('hr-val'); if(el) countUp(el,72,1200); }, 500);

  // Attach all nav clicks
  document.querySelectorAll('.ni').forEach(ni => {
    const id = ni.id.replace('nav-','');
    ni.addEventListener('click', () => switchScreen(id));
  });

  // SOS button
  const sosBtn = document.querySelector('.sos');
  if(sosBtn) sosBtn.addEventListener('click', () => switchScreen('emergency'));

  // Feature grid cards
  document.querySelectorAll('.fc').forEach(fc => {
    fc.addEventListener('click', () => {
      const target = fc.dataset.target;
      if(target === 'modal') openModal(fc.dataset.modal);
      else switchScreen(target);
    });
  });

  // Doctor card
  const dc = document.querySelector('.dc');
  if(dc) dc.addEventListener('click', () => openModal('m-call'));

  // Reminder strip
  const rs = document.querySelector('.rstrip');
  if(rs) rs.addEventListener('click', () => switchScreen('wellness'));

  // Tip cards
  document.querySelectorAll('.ti').forEach(ti => {
    ti.addEventListener('click', () => openModal('m-tip'));
  });

  // Notification bell
  const bell = document.querySelector('.notif-bell');
  if(bell) bell.addEventListener('click', () => openModal('m-notif'));

  // Emergency buttons
  const embs = document.querySelectorAll('.emb');
  if(embs[0]) embs[0].addEventListener('click', () => openModal('m-call'));
  if(embs[1]) embs[1].addEventListener('click', () => openModal('m-call'));
  if(embs[2]) embs[2].addEventListener('click', () => openModal('m-wa'));

  // Food scanner
  const scanBox = document.getElementById('scan-box');
  if(scanBox) scanBox.addEventListener('click', scanFood);

  // Diet add meal
  const dietAdd = document.querySelector('.diet-add');
  if(dietAdd) dietAdd.addEventListener('click', addMeal);

  // Reminder toggles
  document.querySelectorAll('.tog').forEach(tog => {
    tog.addEventListener('click', () => tog.classList.toggle('off'));
  });

  // Upload report
  const uploadZone = document.querySelector('.upload-zone');
  if(uploadZone) uploadZone.addEventListener('click', uploadReport);

  // Book appointment buttons
  document.querySelectorAll(".book-appt-btn").forEach(btn => {
    btn.addEventListener('click', () => openModal('m-book'));
  });

  // Close buttons on all modals
  document.querySelectorAll('.m-close-btn').forEach(btn => {
    btn.addEventListener('click', () => forceClose(btn.dataset.close));
  });

  // Overlay close (click outside modal)
  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('click', e => { if(e.target === ov) ov.classList.remove('open'); });
  });

  // Call end
  const callEnd = document.querySelector('.call-end');
  if(callEnd) callEnd.addEventListener('click', () => forceClose('m-call'));

  // Mic toggle
  const callMic = document.querySelector('.call-mic');
  if(callMic) callMic.addEventListener('click', () => toggleMic(callMic));

  // WA send
  const waBtn = document.querySelector('.wa-send-btn');
  if(waBtn) waBtn.addEventListener('click', () => sendWA(waBtn));

  // WA cancel
  const waCancel = document.querySelector('.wa-cancel-btn');
  if(waCancel) waCancel.addEventListener('click', () => forceClose('m-wa'));

  // Doc opts
  document.querySelectorAll('.doc-opt').forEach(opt => {
    opt.addEventListener('click', () => selectDoc(opt));
  });

  // Slots
  document.querySelectorAll('.slot').forEach(sl => {
    sl.addEventListener('click', () => selectSlot(sl));
  });

  // Book confirm
  const bookConfirm = document.querySelector('.book-confirm-btn');
  if(bookConfirm) bookConfirm.addEventListener('click', () => bookAppt(bookConfirm));

  // Tip play
  const tipPlay = document.getElementById('tip-play');
  if(tipPlay) tipPlay.addEventListener('click', toggleTip);

  // BMI inputs
  const bmiH = document.getElementById('bmi-h');
  const bmiW = document.getElementById('bmi-w');
  if(bmiH) bmiH.addEventListener('input', calcBMI);
  if(bmiW) bmiW.addEventListener('input', calcBMI);

  // BP inputs
  const bpSys = document.getElementById('bp-sys');
  const bpDia = document.getElementById('bp-dia');
  if(bpSys) bpSys.addEventListener('input', checkBP);
  if(bpDia) bpDia.addEventListener('input', checkBP);
});