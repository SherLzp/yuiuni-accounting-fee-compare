import { compareQuotes } from './compare.mjs';
const form = document.querySelector('#compare');
const language = document.querySelector('#language');
const result = document.querySelector('#result');
const fields = [...form.querySelectorAll('input[type=number]')];
function clearResult() { result.textContent = ''; }
form.addEventListener('input', event => {
  clearResult();
  if (event.target.validity?.valid) event.target.setAttribute('aria-invalid', 'false');
});
form.addEventListener('invalid', event => event.target.setAttribute('aria-invalid', 'true'), true);
form.addEventListener('reset', () => { clearResult(); for (const field of fields) field.setAttribute('aria-invalid', 'false'); });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const quote = prefix => Object.fromEntries(['months', 'monthly', 'closing', 'extras'].map(field => [field, document.querySelector(`#${prefix}-${field}`).valueAsNumber]));
  try {
    const values = compareQuotes(quote('a'), quote('b'), document.querySelector('#same-scope').checked);
    const yen = value => new Intl.NumberFormat(language.value === 'ja' ? 'ja-JP' : 'en-US', { style: 'currency', currency: 'JPY' }).format(value);
    const totals = `A: ${yen(values.a)} / B: ${yen(values.b)}`;
    const detail = values.comparable
      ? language.value === 'ja' ? `同じ条件での差額（B − A）：${yen(values.difference)}` : `Difference for comparable quotes (B − A): ${yen(values.difference)}`
      : language.value === 'ja' ? '総額のみを表示しています。同じ期間・範囲を確認するまで、差額を節約額とは判断しません。' : 'Totals only. Confirm the same period and scope before treating a difference as savings.';
    result.textContent = `${totals}\n${detail}`;
  } catch {
    result.textContent = language.value === 'ja' ? '入力範囲を確認してください。金額は0以上の整数、月数は1〜12です。' : 'Check the inputs: non-negative whole yen and 1–12 billed months.';
  }
});
language.addEventListener('change', () => {
  document.documentElement.lang = language.value;
  for (const element of document.querySelectorAll('[data-ja][data-en]')) element.textContent = element.dataset[language.value];
  const source = location.protocol === 'chrome-extension:' ? 'chrome-extension' : 'github';
  document.querySelector('#pricing-link').href = `https://yuiuni.co.jp/${language.value}/pricing/?utm_source=${source}&utm_medium=tool&utm_campaign=fee-compare`;
  clearResult();
});
language.dispatchEvent(new Event('change'));
