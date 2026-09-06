import { toHonocoroko, fromHonocoroko } from 'https://esm.sh/@naandalist/honocoroko@1.4.0';

const I18N = {
  en: {
    title: 'Latin ↔ Javanese script',
    pageTitle: 'honocoroko — Latin ↔ Javanese script',
    description: 'Live playground to transliterate Latin and Javanese script (Aksara Jawa / Hanacaraka). Transliteration, not translation.',
    warn: 'Transliteration, not translation. This changes the writing system, not the meaning of the words.',
    dirTo: 'Latin → Javanese',
    dirFrom: 'Javanese → Latin',
    latin: 'Latin',
    javanese: 'Javanese script',
    copy: 'Copy',
    copied: 'Copied',
    copyFail: 'Copy failed',
    install: 'Use it in a project',
    credit: 'Created by',
  },
  id: {
    title: 'Latin ↔ Aksara Jawa',
    pageTitle: 'honocoroko — Latin ↔ Aksara Jawa',
    description: 'Playground langsung untuk alih aksara Latin dan Aksara Jawa (Hanacaraka). Ini alih aksara, bukan terjemahan.',
    warn: 'Alih aksara, bukan terjemahan. Ini mengganti sistem tulisan, bukan arti kata.',
    dirTo: 'Latin → Jawa',
    dirFrom: 'Jawa → Latin',
    latin: 'Latin',
    javanese: 'Aksara Jawa',
    copy: 'Salin',
    copied: 'Tersalin',
    copyFail: 'Gagal menyalin',
    install: 'Pakai di proyek',
    credit: 'Dibuat oleh',
  },
};

const input = document.getElementById('input');
const output = document.getElementById('output');
const status = document.getElementById('status');
const dirTo = document.getElementById('dir-to');
const dirFrom = document.getElementById('dir-from');
const useMurda = document.getElementById('useMurda');
const useSwara = document.getElementById('useSwara');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const langEn = document.getElementById('lang-en');
const langId = document.getElementById('lang-id');

let direction = 'to';
let lang = 'en';

function t(key) {
  return I18N[lang][key];
}

function options() {
  return {
    useMurda: useMurda.checked,
    useSwara: useSwara.checked,
  };
}

function run() {
  const text = input.value;
  try {
    output.textContent = direction === 'to'
      ? toHonocoroko(text, options())
      : fromHonocoroko(text, options());
    status.hidden = true;
  } catch (err) {
    output.textContent = '';
    status.hidden = false;
    status.textContent = err instanceof Error ? err.message : String(err);
  }
}

function applyDirectionLabels() {
  inputLabel.textContent = direction === 'to' ? t('latin') : t('javanese');
  outputLabel.textContent = direction === 'to' ? t('javanese') : t('latin');
  output.classList.toggle('aksara', direction === 'to');
}

function setDirection(next) {
  direction = next;
  dirTo.classList.toggle('on', next === 'to');
  dirFrom.classList.toggle('on', next === 'from');
  applyDirectionLabels();
  run();
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.title = t('pageTitle');
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t('description'));
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  langEn.classList.toggle('on', lang === 'en');
  langId.classList.toggle('on', lang === 'id');
  applyDirectionLabels();
}

function writeQuery() {
  const url = new URL(window.location.href);
  if (input.value) url.searchParams.set('q', input.value);
  else url.searchParams.delete('q');
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}

function setLang(next) {
  lang = next === 'id' ? 'id' : 'en';
  try { localStorage.setItem('honocoroko-lang', lang); } catch {}
  applyI18n();
  writeQuery();
}

async function copy(text, button) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    const prev = button.textContent;
    button.textContent = t('copied');
    setTimeout(() => { button.textContent = t('copy'); }, 900);
  } catch {
    status.hidden = false;
    status.textContent = t('copyFail');
  }
}

dirTo.addEventListener('click', () => setDirection('to'));
dirFrom.addEventListener('click', () => setDirection('from'));
langEn.addEventListener('click', () => setLang('en'));
langId.addEventListener('click', () => setLang('id'));
input.addEventListener('input', () => {
  writeQuery();
  run();
});
useMurda.addEventListener('change', run);
useSwara.addEventListener('change', run);
document.getElementById('copy-in').addEventListener('click', () => copy(input.value, document.getElementById('copy-in')));
document.getElementById('copy-out').addEventListener('click', () => copy(output.textContent, document.getElementById('copy-out')));

document.getElementById('chips').addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-q]');
  if (!btn) return;
  setDirection('to');
  input.value = btn.dataset.q;
  writeQuery();
  run();
});

const params = new URLSearchParams(window.location.search);
const stored = (() => { try { return localStorage.getItem('honocoroko-lang'); } catch { return null; } })();
lang = params.get('lang') === 'id' || params.get('lang') === 'en'
  ? params.get('lang')
  : (stored === 'id' ? 'id' : 'en');
input.value = params.get('q') ?? 'hanacaraka';
applyI18n();
run();
writeQuery();
