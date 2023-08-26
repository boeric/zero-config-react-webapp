/*
  test-babel.js

  Bo Ericsson 2021
*/

/* eslint-disable no-console, no-inner-declarations */
// @flow

// Exports
export default async function testBabel() {
  // Variables
  let value;
  let obj;
  const results = [];

  try {
    // Test template string
    value = 'template string works';
    results.push(`${value}`);

    // Test tagged template
    function tag(strings, t, w) {
      return `tagged ${t} ${w}s`;
    }
    const template = 'template';
    const work = 'work';
    results.push(tag`does tagged ${template} ${work}?`);

    // Test arrow functions
    const arrow = (d) => {
      results.push(d);
    };
    arrow('arrow works');

    // Test arrow iife
    (() => {
      results.push('arrow iife works');
    })();

    // Test async function
    async function asyncTest() {
      results.push('async function works');
    }
    asyncTest();

    // Test async iife function
    (async () => {
      results.push('async iife works');
    })();

    // Test spread
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newArray = [...Array(10).keys()];
    if (array.length === newArray.length && array.every((d, i) => d === newArray[i])) {
      results.push('spread works');
    } else {
      results.push('spread does not work', array, newArray);
    }

    // Test generator
    function* generator() {
      while (true) {
        yield 'generator works';
      }
    }
    const gen = generator();
    results.push(gen.next().value);

    // Test Map
    const map = new Map();
    map.set('key', 'Map works');
    results.push(map.get('key'));

    // Test Set
    const set = new Set();
    set.add('Set works');
    results.push([...set.values()][0]);

    // Test WeakMap
    const weakMap0 = new WeakMap();
    const objArr = [{}, {}];
    weakMap0.set(objArr[0], 'value0');
    weakMap0.set(objArr[1], 'value1');

    objArr.length = 1; // Remove item 1
    if (weakMap0.has(objArr[0]) && !weakMap0.has(objArr[1])) {
      results.push('WeakMap 0 works');
    } else {
      results.push(`WeakMap 0 does NOT work (${String(weakMap0.has(objArr[1]))})`);
    }

    // Test WeakMap again (have to do flow overrides here)
    const weakMap1 = new WeakMap();
    obj = {
      key0: {},
      key1: {},
    };
    value = 'WeakMap 1 works';
    weakMap1.set(obj.key0, value);
    weakMap1.set(obj.key1, '');
    // $FlowFixMe
    delete obj.key1;
    // $FlowFixMe
    if (weakMap1.get(obj.key1) === undefined) {
      results.push(weakMap1.get(obj.key0));
    } else {
      results.push('WeakMap 1 does NOT work');
    }

    // Test WeakSet
    const weakSet = new WeakSet();
    obj = {
      obj0: {},
      obj1: {},
    };
    weakSet.add(obj.obj0);
    weakSet.add(obj.obj1);

    // $FlowFixMe
    delete obj.obj1;
    if (weakSet.has(obj.obj0) && !weakSet.has(obj.obj1)) {
      results.push('WeakSet works');
    } else {
      results.push('WeakSet does NOT work');
    }

    // Test getter/setter
    obj = {
      internal: 'getter works',
      get string() {
        return this.internal;
      },
      set newString(newValue) {
        this.internal = newValue;
      },
    };
    results.push(obj.string);
    obj.newString = 'setter works';
    results.push(obj.string);

    // Test optional chaining
    try {
      obj = {
        prop0: {
          prop00: {},
        },
      };
      value = obj?.prop0?.prop00?.prop000 || 'optional chaining works';
      results.push(value);
    } catch (e) {
      results.push(`optional chaining does NOT work: ${e}`);
    }

    // Test nullish coalescing operator
    try {
      const arr = [0, '', undefined, null];
      const nullishResults = arr.map((d) => d ?? 'nullish');
      const nullishExpected = [0, '', 'nullish', 'nullish'];
      // const orResults = arr.map((d) => d || 'nullish');
      if (nullishResults.toString() === nullishExpected.toString()) {
        results.push('nullish coalescing operator works');
      } else {
        throw new Error('Incorrect result');
      }
    } catch (e) {
      results.push(`nullish coalescing operator does NOT work: ${e}`);
    }
  } catch (error) {
    return Promise.reject(new Error(error));
  }

  return Promise.resolve(results);
}
