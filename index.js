'use strict';
const { Android } = require('./android.js');

// User facing API
const android = new Android();

async function run() {
  console.log('Node started!');
  console.log('Calling android.vibrate()...');
  console.log(await android.vibrate());
  console.log('Done!');
  console.log('Calling android.cameraInfoHI()...');
  console.log(await android.cameraInfoHI());
  console.log('Done!');
  console.log('Calling android.cameraInfoLO()...');
  console.log(await android.cameraInfoLO());
  console.log('Done!');
  console.log('Exiting node...');
}

run();
