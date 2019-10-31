'use strict';

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

// User facing API
const { Android } = require('./android.js');

const android = new Android();

async function run() {
  console.log('Node started!');
  console.log('Calling android.ls()...');
  console.log(await android.ls());
  console.log('Done!');
  console.log('Calling android.vibrate()...');
  console.log(await android.vibrate());
  console.log('Done!');
  console.log('Calling android.cameraInfo()...');
  console.log(await android.cameraInfo());
  console.log('Done!'); 
  console.log('Calling android.setUpStorage()...');
  console.log(await android.setUpStorage());
  console.log('Done!');
  console.log('Calling android.cameraPhoto(`myman.jpg`)...');
  console.log(await android.cameraPhoto(`myman.jpg`));
  console.log('Done!');
  console.log('Calling android.open(`myman.jpg`)...');
  console.log(await android.open(`myman.jpg`));
  console.log('Done!');
  console.log('Exiting node...');
}

run();
