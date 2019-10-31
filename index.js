'use strict';
const { Android } = require('./android.js');

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

// User facing API
const android = new Android();

async function run() {
  console.log('Node started!');
  console.log('Calling android.ls()...');
  console.log(await android.ls());
  console.log('Calling android.vibrate()...');
  console.log(await android.vibrate());
  console.log('Done!');
  console.log('Calling android.cameraInfo()...');
  console.log(await android.cameraInfo());
  console.log('Done!');
  console.log('JSON parsing android.cameraInfo()...');
  // console.log(result);
  // console.table(result);
  // console.log(result.stdout);
  // console.table(result.stdout);
  const result = await android.cameraInfo();
  console.log(await JSON.parse(result.stdout));
  console.log('Done!');
  console.log('Exiting node...');
}

run();