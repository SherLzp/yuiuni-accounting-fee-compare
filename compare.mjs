export function compareQuotes(a, b, sameScope) {
  for (const quote of [a, b]) {
    for (const field of ['months', 'monthly', 'closing', 'extras']) {
      const value = quote[field];
      if (!Number.isInteger(value) || value < (field === 'months' ? 1 : 0) || value > (field === 'months' ? 12 : 1_000_000_000)) throw new RangeError(`Invalid ${field}`);
    }
  }
  const totalA = a.months * a.monthly + a.closing + a.extras;
  const totalB = b.months * b.monthly + b.closing + b.extras;
  const comparable = sameScope === true && a.months === b.months;
  return { a: totalA, b: totalB, difference: comparable ? totalB - totalA : null, comparable };
}
