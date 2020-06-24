/* global test, expect */

import a, { nonDefaultExport as b, sum } from './module';

test('string from default export', () => {
  expect(a()).toMatch('default export/import works');
});

test('string from non-default export', () => {
  expect(b()).toMatch('non-default export/import works');
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
