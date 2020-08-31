/* index.js */
/* eslint-disable no-console */
// @flow

// Imports
import 'regenerator-runtime/runtime';
import './styles.css';

// Imports
import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import testBabel from './test-babel';
import App from './App';

// Test various ES6/ES-2018 features
console.log(testBabel());

// Log D3 version
console.log(`D3 version: ${d3.version}`);

// Initial React render
const title = 'Zero Config React Webapp Template';
const appElem = document.getElementById('app');

if (appElem) {
  ReactDOM.render(
    <App title={title} />,
    appElem,
  );
}
