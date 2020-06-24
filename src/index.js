/* eslint-disable no-console */

// Imports
import 'regenerator-runtime/runtime';
import './styles.css';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';

import testBabel from './test-babel';

// Test various ES6/ES-2018 features
console.log(testBabel());

// Initial React render
const title = 'Zero Config React Webapp Template';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app'),
);
