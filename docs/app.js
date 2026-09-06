import { toHonocoroko, fromHonocoroko } from 'https://esm.sh/@naandalist/honocoroko@1.3.0';

const input = document.getElementById('input');
const output = document.getElementById('output');
const status = document.getElementById('status');
const dirTo = document.getElementById('dir-to');
const dirFrom = document.getElementById('dir-from');
const useMurda = document.getElementById('useMurda');
const useSwara = document.getElementById('useSwara');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');

let direction = 'to';

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

function setDirection(next) {
  direction = next;
  dirTo.classList.toggle('on', next === 'to');
  dirFrom.classList.toggle('on', next === 'from');
  inputLabel.textContent = next === 'to' ? 'Latin' : 'Aksara Jawa';
  outputLabel.textContent = next === 'to' ? 'Aksara Jawa' : 'Latin';
  output.classList.toggle('aksara', next === 'to');
  run();
}

function writeQuery(q) {
  const url = new URL(window.location.href);
  if (q) url.searchParams.set('q', q);
  else url.searchParams.delete('q');
  history.replaceState(null, '', url);
}

async function copy(text, button) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    const prev = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = prev; }, 900);
  } catch {
    status.hidden = false;
    status.textContent = 'Copy failed';
  }
}

dirTo.addEventListener('click', () => setDirection('to'));
dirFrom.addEventListener('click', () => setDirection('from'));
input.addEventListener('input', () => {
  writeQuery(input.value);
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
  writeQuery(input.value);
  run();
});

const initial = new URLSearchParams(window.location.search).get('q');
input.value = initial ?? 'hanacaraka';
run();
