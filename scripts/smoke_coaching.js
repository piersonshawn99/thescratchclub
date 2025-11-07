#!/usr/bin/env node
// scripts/smoke_coaching.js
// Simple smoke test that hits the /coaching route on a running local server.
// Usage: node ./scripts/smoke_coaching.js [URL]

const http = require('http');

const url = process.argv[2] || 'http://localhost:3000/coaching';

function exitFail(msg) {
  console.error('SMOKE TEST FAILED:', msg);
  process.exit(1);
}

console.log('Checking', url);

const req = http.get(url, (res) => {
  const { statusCode } = res;
  if (statusCode >= 200 && statusCode < 400) {
    console.log(`OK — status ${statusCode}`);
    process.exit(0);
  } else {
    exitFail(`unexpected status ${statusCode}`);
  }
});

req.on('error', (err) => {
  exitFail(err.message);
});
