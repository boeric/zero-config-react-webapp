/*
  index.js

  @flow
*/

/* eslint-disable no-console */

// Imports
import 'regenerator-runtime/runtime';
import './styles.css';

// Imports
import * as d3 from 'd3';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Log D3 version
console.log(`D3 version: ${d3.version}`);

// Initial React render
const title = 'Zero Config React/D3/Webpack/Babel/Jest/Eslint App Template';
const appElem = document.getElementById('app');
const root = createRoot(appElem);

if (appElem) {
  root.render(<App title={title} />);
}
