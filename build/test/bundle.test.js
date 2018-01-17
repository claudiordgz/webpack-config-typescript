const lib = require('../bundle');

test('adds 1 + 2 to equal 3', () => {
  expect(lib.addTwo(1, 2)).toBe(3);
});

test('returns helloWorld message', () => {
  expect(lib.helloWorld('Test!')).toBe('Hello there Test!');
});

