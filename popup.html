let config = {
  ac_interval: 100,
  ac_offset: 20,
  ac_hk: 'F8'
};

let binding = false;

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
  document.getElementById('ac_interval').value = config.ac_interval;
  document.getElementById('ac_offset').value = config.ac_offset;
  document.getElementById('ac_hk_btn').textContent = `[${config.ac_hk}] (Click to Set)`;
});

document.getElementById('kofiLink').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'https://ko-fi.com/easyclickstudio' });
});

function saveAndNotify() {
  chrome.storage.local.set(config, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateConfig', config }, () => {
          if (chrome.runtime.lastError) {}
        });
      }
    });
  });
}

['ac_interval', 'ac_offset'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    config[id] = parseFloat(e.target.value) || 0;
    saveAndNotify();
  });
});

const hkBtn = document.getElementById('ac_hk_btn');
hkBtn.addEventListener('click', () => {
  binding = true;
  hkBtn.textContent = '>> PRESS ANY KEY <<';
  hkBtn.classList.add('binding');
});

document.addEventListener('keydown', (e) => {
  if (!binding) return;
  e.preventDefault();

  const cleanKey = normalizeKey(e);
  config.ac_hk = cleanKey;
  hkBtn.textContent = `[${cleanKey}] (Click to Set)`;
  hkBtn.classList.remove('binding');

  binding = false;
  saveAndNotify();
});
