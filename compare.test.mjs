import test from 'node:test';
import assert from 'node:assert/strict';
import { compareQuotes } from './compare.mjs';
const quote = { months: 12, monthly: 15000, closing: 90000, extras: 0 };
test('totals use billed months and do not treat unlike scope as savings', () => {
  assert.deepEqual(compareQuotes(quote, { ...quote, monthly: 20000 }, true), { a: 270000, b: 330000, difference: 60000, comparable: true });
  assert.equal(compareQuotes(quote, quote, false).difference, null);
  assert.equal(compareQuotes(quote, {...quote,months:6},true).comparable,false);
  assert.equal(compareQuotes({...quote,monthly:0,closing:150000},quote,true).a,150000);
});
test('reject missing, non-finite, negative, fractional and out-of-range inputs', () => {
  for(const bad of [-1,NaN,Infinity,1.5,1000000001,null,undefined,'15000']) assert.throws(()=>compareQuotes({...quote,monthly:bad},quote,true));
  for(const months of [0,13,1.5]) assert.throws(()=>compareQuotes({...quote,months},quote,true));
  assert.equal(compareQuotes({...quote,monthly:0,closing:0},quote,true).a,0);
});
