let config = {
  ac_interval: 100,
  ac_offset: 20,
  ac_hk: 'F8'
};

let mouseX = 0;
let mouseY = 0;
let lastHoverTarget = null;
let isAcActive = false;
let acTimer = null;

const RU_TO_EN = {
  'Й':'Q','Ц':'W','У':'E','К':'R','Е':'T','Н':'Y','Г':'U','Ш':'I','Щ':'O','З':'P','Х':'[','Ъ':']',
  'Ф':'A','Ы':'S','В':'D','А':'F','П':'G','Р':'H','О':'J','Л':'K','Д':'L','Ж':';','Э':"'",
  'Я':'Z','Ч':'X','С':'C','М':'V','И':'B','Т':'N','Ь':'M','Б':',','Ю':'.'
};

function normalizeKey(e) {
  if (!e) return '';
  if (e.code && e.code.startsWith('Key')) return e.code.replace('Key', '').toUpperCase();
  if (e.code && e.code.startsWith('Digit')) return e.code.replace('Digit', '');

  let keyStr = (e.key || '').toUpperCase();
  if (keyStr === ' ') return 'SPACE';
  if (RU_TO_EN[keyStr]) return RU_TO_EN[keyStr];
  return keyStr;
}

chrome.storage.local.get(config, (saved) => {
  config = { ...config, ...saved };
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'updateConfig') config = msg.config;
});

function updateMousePos(e) {
  if (e.clientX !== undefined && e.clientY !== undefined) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  if (e.target && e.target.id !== 'easyclicker-toast') {
    lastHoverTarget = e.target;
  }
}

window.addEventListener('mousemove', updateMousePos, { capture: true, passive: true });
window.addEventListener('mouseover', updateMousePos, { capture: true, passive: true });

function getTargetElement() {
  if (mouseX > 0 || mouseY > 0) {
    const el = document.elementFromPoint(mouseX, mouseY);
    if (el && el.id !== 'easyclicker-toast') return el;
  }
  return lastHoverTarget || document.activeElement || document.body;
}

window.addEventListener('keydown', (e) => {
  const pressedKey = normalizeKey(e);
  const targetKey = (config.ac_hk || 'F8').toUpperCase();

  if (pressedKey === targetKey) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    toggleAutoClicker();
  }
}, true);

function fireFullClick(el) {
  if (!el) return;
  try {
    const rect = el.getBoundingClientRect();
    const cX = mouseX || (rect.left + rect.width / 2);
    const cY = mouseY || (rect.top + rect.height / 2);

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      view: window,
      clientX: cX,
      clientY: cY,
      button: 0,
      buttons: 1
    };

    if (window.PointerEvent) {
      el.dispatchEvent(new PointerEvent('pointerdown', Object.assign({}, init, { pointerId: 1, pointerType: 'mouse' })));
    }
    el.dispatchEvent(new MouseEvent('mousedown', init));

    if (typeof el.focus === 'function') el.focus();

    init.buttons = 0;
    if (window.PointerEvent) {
      el.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, init, { pointerId: 1, pointerType: 'mouse' })));
    }
    el.dispatchEvent(new MouseEvent('mouseup', init));

    if (typeof el.click === 'function') {
      el.click();
    } else {
      el.dispatchEvent(new MouseEvent('click', init));
    }
  } catch (err) {}
}

function toggleAutoClicker() {
  isAcActive = !isAcActive;
  showToast(isAcActive ? `⚡ Autoclicker: ACTIVE [${config.ac_hk}]` : "⚡ Autoclicker: STOPPED");

  if (isAcActive) {
    runAcLoop();
  } else {
    clearTimeout(acTimer);
  }
}

function runAcLoop() {
  if (!isAcActive) return;

  try {
    const target = getTargetElement();
    fireFullClick(target);
  } catch (e) {}

  const offsetMs = (Math.random() * 2 - 1) * (config.ac_offset || 0);
  const delay = Math.max(10, (config.ac_interval || 100) + offsetMs);

  acTimer = setTimeout(runAcLoop, delay);
}

function showToast(text) {
  let toast = document.getElementById('easyclicker-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'easyclicker-toast';
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 2147483647;
      background: #2B2D31; color: #F3F4F6; padding: 10px 16px; border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
      font-size: 13px; font-weight: bold; border: 1px solid #3F4147;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5); transition: opacity 0.2s;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 1800);
}