'use strict';

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

const wait = async () => {
  return await setTimeout(console.log, 100000000)
};

const pause = async () => {
  return await setTimeout(console.log, 1000)
};

// User facing API
const { Android } = require('./android.js');

const android = new Android();

const demoStart = async () => {
  console.log('Node started!');
};

const demoLs = async () => {
  console.log('Calling android.ls()...');
  console.log(await android.ls());
  console.log('Done!');
};

const demoRm = async () => {
  console.log('Calling android.rm()...');
  console.log(await android.rm());
  console.log('Done!');
};

const demoVibrate = async () => {
  console.log('Calling android.vibrate()...');
  console.log(await android.vibrate());
  console.log('Done!');
};

const demoCameraInfo = async () => {
  console.log('Calling android.cameraInfo()...');
  console.log(await android.cameraInfo());
  console.log('Done!');
};

const demoSetUpStorage = async () => {
  console.log('Calling android.setUpStorage()...');
  console.log(await android.setUpStorage());
  console.log('Done!');
};

const demoCameraPhoto = async () => {
  console.log('Calling android.cameraPhoto()...');
  console.log(await android.cameraPhoto());
  console.log('Done!');
};

const demoOpenFile = async () => {
  console.log('Calling android.openFile()...');
  console.log(await android.openFile());
  console.log('Done!');
};

const demoOpenURL = async () => {
  console.log('Calling android.openURL(`https://www.study-at-salt.com`)...');
  console.log(await android.openURL(`https://www.study-at-salt.com`));
  console.log('Done!');
};

const demoDialogConfirm = async () => {
  console.log('Calling android.dialogConfirm()...');
  console.log(await android.dialogConfirm());
  console.log('Done!');
};

const demoEnd = async () => {
  console.log('CTRL+C to kill node...');
};


async function run() {
  const androidFunctions = [
    demoStart,
    demoLs,
    pause,
    demoRm,
    pause,
    demoLs,
    pause,
    // demoVibrate,
    // demoCameraInfo,
    // demoSetUpStorage,
    demoCameraPhoto,
    pause,
    demoOpenFile,
    pause,
    // demoOpenURL,
    // demoDialogConfirm,
    wait,
    demoEnd,
  ];
  for (const each of androidFunctions) {
    await each(); // call function to get returned Promise
  };
}

run();
