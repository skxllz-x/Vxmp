/* Script for New Boroughs NYC landing
   - Admin-protected link editor (client-side)
   - Audio widget with play/pause, mute, volume, and progress bar
   - Persists links & volume to localStorage
*/

/* ========== CONFIG ========== */
/* CHANGE THIS before publishing: this is the client-side admin password.
   For real security, replace client-side gating with server-side auth. */
const ADMIN_PASSWORD = 'changeme'; // <- change me

/* ========== Defaults ========== */
const DEFAULTS = {
  discord1: { label: 'Discord 1', href: 'https://discord.gg/EXAMPLE1' },
  discord2: { label: 'Discord 2', href: 'https://discord.gg/EXAMPLE2' },
  roblox:   { label: 'Play on Roblox', href: 'https://www.roblox.com/games/EXAMPLE' },
  trackTitle: 'music.mp3'
};

const STORAGE_KEY = 'nb_links_v1';
const VOLUME_KEY = 'nb_volume_v1';
const ADMIN_KEY = 'nb_admin_v1'; // stores boolean 'true' when logged in

/* ========== Utilities ========== */
function saveLinks(obj){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
function loadLinks(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return DEFAULTS;
    return Object.assign({}, DEFAULTS, JSON.parse(raw));
  } catch(e) {
    return DEFAULTS;
  }
}

/* ========== DOM references ========== */
const links = loadLinks();
const d1 = document.getElementById('discord1');
const d2 = document.getElementById('discord2');
const rb = document.getElementById('roblox');
const d1LabelEl = document.getElementById('discord1-label');
const d2LabelEl = document.getElementById('discord2-label');
const rbLabelEl = document.getElementById('roblox-label');

const openEditorBtn = document.getElementById('openEditor');
const loginModal = document.getElementById('loginModal');
const loginOk = document.getElementById('loginOk');
const loginCancel = document.getElementById('loginCancel');
const adminPassInput = document.getElementById('admin-pass');
const editPanel = document.getElementById('editPanel');
const cancelEdit = document.getElementById('cancelEdit');
const saveEdit = document.getElementById('saveEdit');

/* Audio elements */
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volume');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

/* ========== Initialization ========== */
function applyLinks(l){
  d1.href = l.discord1.href || '#';
  d1LabelEl.textContent = l.discord1.label || DEFAULTS.discord1.label;

  d2.href = l.discord2.href || '#';
  d2LabelEl.textContent = l.discord2.label || DEFAULTS.discord2.label;

  rb.href = l.roblox.href || '#';
  rbLabelEl.textContent = l.roblox.label || DEFAULTS.roblox.label;

  // track title shown in audio widget (if you want to display separately)
  document.title = `${l.roblox.label || DEFAULTS.roblox.label} — New Boroughs NYC`;
}
applyLinks(links);

/* ========== Admin gating ========== */
function isAdmin() {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}
function setAdmin(val) {
  if(val) localStorage.setItem(ADMIN_KEY, 'true'); else localStorage.removeItem(ADMIN_KEY);
}

openEditorBtn.addEventListener('click', () => {
  if(isAdmin()){
    openEditorPanel();
    return;
  }
  // show login modal
  loginModal.style.display = 'block';
  loginModal.setAttribute('aria-hidden','false');
  adminPassInput.value = '';
  adminPassInput.focus();
});

loginCancel.addEventListener('click', () => {
  loginModal.style.display = 'none';
  loginModal.setAttribute('aria-hidden','true');
});

loginOk.addEventListener('click', () => {
  const val = adminPassInput.value || '';
  if(val === ADMIN_PASSWORD){
    setAdmin(true);
    loginModal.style.display = 'none';
    loginModal.setAttribute('aria-hidden','true');
    openEditorPanel();
  } else {
    // simple feedback — you can replace with styled message
    adminPassInput.value = '';
    adminPassInput.placeholder = 'Wrong password';
    adminPassInput.focus();
  }
});

/* keyboard support */
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    // close any modal/panel
    if(loginModal.style.display === 'block'){ loginModal.style.display = 'none'; loginModal.setAttribute('aria-hidden','true'); }
    if(editPanel.style.display === 'flex'){ editPanel.style.display = 'none'; editPanel.setAttribute('aria-hidden','true'); }
  }
});

/* ========== Editor panel ========== */
function openEditorPanel(){
  // populate inputs from current links
  document.getElementById('d1-label').value = links.discord1.label;
  document.getElementById('d1-href').value = links.discord1.href;
  document.getElementById('d2-label').value = links.discord2.label;
  document.getElementById('d2-href').value = links.discord2.href;
  document.getElementById('rb-label').value = links.roblox.label;
  document.getElementById('rb-href').value = links.roblox.href;
  editPanel.style.display = 'flex';
  editPanel.setAttribute('aria-hidden','false');
}
cancelEdit.addEventListener('click', () => {
  editPanel.style.display = 'none';
  editPanel.setAttribute('aria-hidden','true');
});
saveEdit.addEventListener('click', () => {
  links.discord1.label = document.getElementById('d1-label').value || DEFAULTS.discord1.label;
  links.discord1.href  = document.getElementById('d1-href').value || DEFAULTS.discord1.href;
  links.discord2.label = document.getElementById('d2-label').value || DEFAULTS.discord2.label;
  links.discord2.href  = document.getElementById('d2-href').value || DEFAULTS.discord2.href;
  links.roblox.label   = document.getElementById('rb-label').value || DEFAULTS.roblox.label;
  links.roblox.href    = document.getElementById('rb-href').value || DEFAULTS.roblox.href;
  saveLinks(links);
  applyLinks(links);
  editPanel.style.display = 'none';
  editPanel.setAttribute('aria-hidden','true');
});

/* ========== Audio controls ========== */
// set initial volume from saved or default
try {
  const savedVol = parseFloat(localStorage.getItem(VOLUME_KEY));
  if(!Number.isNaN(savedVol)) {
    audio.volume = Math.max(0, Math.min(1, savedVol));
    volumeSlider.value = audio.volume.toString();
  } else {
    audio.volume = parseFloat(volumeSlider.value);
  }
} catch(e){
  audio.volume = parseFloat(volumeSlider.value);
}

/* Play/pause */
function updatePlayUI(){
  if(audio.paused){
    playBtn.textContent = '►';
    playBtn.setAttribute('aria-label','Play');
  } else {
    playBtn.textContent = '❚❚';
    playBtn.setAttribute('aria-label','Pause');
  }
}
playBtn.addEventListener('click', async () => {
  if(audio.paused){
    try { await audio.play(); } catch(err) { console.warn('Play prevented:', err); }
  } else {
    audio.pause();
  }
  updatePlayUI();
});
audio.addEventListener('play', updatePlayUI);
audio.addEventListener('pause', updatePlayUI);
audio.addEventListener('ended', updatePlayUI);

/* Mute/unmute */
function updateMuteUI(){
  if(audio.muted || audio.volume === 0){
    muteBtn.textContent = '🔇';
    muteBtn.setAttribute('aria-label','Unmute');
  } else {
    muteBtn.textContent = '🔊';
    muteBtn.setAttribute('aria-label','Mute');
  }
}
muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  // if unmuting and volume is zero, set to a sensible default
  if(!audio.muted && audio.volume === 0){
    audio.volume = 0.5;
    volumeSlider.value = audio.volume;
    localStorage.setItem(VOLUME_KEY, audio.volume.toString());
  }
  updateMuteUI();
});
audio.addEventListener('volumechange', updateMuteUI);

/* Volume slider */
volumeSlider.addEventListener('input', e => {
  audio.volume = parseFloat(e.target.value);
  if(audio.volume > 0 && audio.muted) audio.muted = false;
  try { localStorage.setItem(VOLUME_KEY, audio.volume.toString()); } catch(e){}
  updateMuteUI();
});

/* Progress bar: update as audio plays and support seeking */
function formatTime(seconds){
  if(!isFinite(seconds)) return '0:00';
  const s = Math.floor(seconds % 60).toString().padStart(2,'0');
  const m = Math.floor(seconds / 60);
  return `${m}:${s}`;
}
audio.addEventListener('loadedmetadata', () => {
  const dur = audio.duration || 0;
  durationEl.textContent = formatTime(dur);
  progress.max = dur;
});
audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});
progress.addEventListener('input', (e) => {
  // seeking preview
  currentTimeEl.textContent = formatTime(parseFloat(e.target.value));
});
progress.addEventListener('change', (e) => {
  audio.currentTime = parseFloat(e.target.value);
});

/* Initialize UI states */
updatePlayUI();
updateMuteUI();

/* ========== Notes ==========
 - This admin gating is client-side. For production, implement server-side login.
 - Change ADMIN_PASSWORD constant before publishing.
 - Assets referenced in HTML must be placed in src/:
    src/background.gif
    src/logo.png
    src/music.mp3
 - Links and volume are saved to localStorage.
=========================== */
