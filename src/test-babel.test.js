/*
  test-babel.test.js

  Bo Ericsson 2021
*/

/* global test, expect */
/* eslint-disable no-console, lines-between-class-members */

import testBabel from './test-babel';

// Test public and private class field declarations (currently an experimental feature)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
const PUBLIC_FIELD_VALUE = 'valueOfAPublicField';
const PRIVATE_FIELD_VALUE = 'valueOfAPrivateField';

class Test {
  aPublicField = PUBLIC_FIELD_VALUE;
  #aPrivateField = PRIVATE_FIELD_VALUE;

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

test('Babel compatibility', () => {
  const expected = [
    'template string works',
    'tagged template works',
    'arrow works',
    'arrow iife works',
    'async function works',
    'async iife works',
    'spread works',
    'generator works',
    'Map works',
    'Set works',
    'WeakMap 0 works',
    'WeakMap 1 works',
    'WeakSet works',
    'getter works',
    'setter works',
    'optional chaining works',
    'nullish coalescing operator works',
  ].join('|');

  testBabel().then((result) => {
    expect(result.join('|')).toMatch(expected);
  }).catch((e) => { console.log(e); });
});
