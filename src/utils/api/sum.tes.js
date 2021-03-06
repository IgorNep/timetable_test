import mult, { sum } from './sum';

test('should 2+2 return 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test('shoild return m,ult of two digits', () => {
  expect(mult(2, 3)).toBe(6);
});

test('should not return correct result', () => {
  expect(mult(2, 2)).not.toBe(6);
});
