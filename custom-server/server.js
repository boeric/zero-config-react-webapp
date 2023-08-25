/* server.js

  Custom node server that
    - Serves a React app backend
    - Provides custom endpoints

   Bo Ericsson 2021
*/

/*
  curl http://localhost:3001
  curl http://localhost:3001/api
*/

/* eslint-disable no-console, quotes */

// Dependencies
const path = require('path');
const express = require('express');
// const http = require('http');
const https = require('https');

// https://api.ipify.org/

// const distDir = process.argv[2] ?? '../dist';
// const port = process.argv[3] ?? 8000;
// console.log('distDir', distDir);
// console.log('port', port);

// https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0
// https://www.7timer.info/bin/astro.php
const apiSchema = {
  '/api': 'local',
  '/ip': 'remote',
  '/reflect': 'local',
  '/weather': 'remote',
};

console.log('Node version:', process.version);

// Constants
const PORT = process.env.PORT || 8000;

// Initialize
const app = express();

// console.log('__dirname', __dirname);
// console.log('full path', path.resolve(__dirname, '../dist', 'index.html'));

// Define static path
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/api', (req, res) => {
  res.write(JSON.stringify(apiSchema));
  res.end();
});

app.post('/reflect', (req, res) => {
  if (req.method !== 'POST') {
    res.send(500, "Bad method, assumed POST");
  }
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => { // do 400
    try {
      const parsed = JSON.parse(body);
      res.write(JSON.stringify(parsed));
      res.end();
    } catch (error) {
      res.send(400, 'Bad JSON data');
    }
  });
});

// https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0
app.get('/weather', (reqIn, resIn) => {
  const options = {
    hostname: 'www.7timer.info',
    port: 443,
    path: '/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0',
    method: 'GET',
  };

  const reqOut = https.request(options, (resOut) => {
    resOut.on('data', (d) => {
      resIn.write(d);
      resIn.end();
    });
  });

  reqOut.on('error', (error) => {
    console.error('reqO error', error);
  });

  reqOut.end();
});

app.get('/ip', (reqIn, resIn) => {
  const options = {
    hostname: 'api.ipify.org',
    port: 443,
    path: '/',
    method: 'GET',
  };

  const reqOut = https.request(options, (resOut) => {
    resOut.on('data', (d) => {
      resIn.write(d);
      resIn.end();
    });
  });

  reqOut.on('error', (error) => {
    console.error('reqO error', error);
  });

  reqOut.end();
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Return the app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

console.log('Server is up...');
