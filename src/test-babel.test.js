/* test-babel.test.js */
/* global test, expect */
// @flow

import testBabel from './test-babel';

test('string from default export', () => {
  expect(testBabel()).toMatch('default export/import works');
});

// Test public and private class field declarations (currently an experimental feature)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
const PUBLIC_FIELD_VALUE = 'valueOfAPublicField';
const PRIVATE_FIELD_VALUE = 'valueOfAPrivateField';

class Test {
  /* eslint-disable lines-between-class-members */
  aPublicField = PUBLIC_FIELD_VALUE;
  #aPrivateField = PRIVATE_FIELD_VALUE;
  /* eslint-enable lines-between-class-members */

  get publicField() {
    return this.aPublicField;
  }

  get privateField() {
    return this.#aPrivateField;
  }
}

const testInstance = new Test();

test('access public class field with getter', () => {
  expect(testInstance.publicField).toEqual(PUBLIC_FIELD_VALUE);
});

test('access public class field directly', () => {
  expect(testInstance.aPublicField).toEqual(PUBLIC_FIELD_VALUE);
});

test('access private class field with getter', () => {
  expect(testInstance.privateField).toEqual(PRIVATE_FIELD_VALUE);
});

test('access public class field directly', () => {
  // $FlowFixMe
  expect(testInstance.aPrivateField).toEqual(undefined);
});
