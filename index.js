'use strict';

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

// User facing API
const { Android } = require('./android.js');

const android = new Android();

const demoStart = async () => {
  console.log('Node started!');
};

const demoEval = async () => {
  console.log(`Calling android.eval('rm', '-rf', 'myman.jpg')...`);
  console.log(await android.eval('rm', '-rf', 'myman.jpg'));
  console.log('Done!');
};

const demoLs = async () => {
  console.log('Calling android.ls()...');
  console.log(await android.ls());
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

// const demoSetUpStorage = async () => {
//   console.log('Calling android.setUpStorage()...');
//   console.log(await android.setUpStorage());
//   console.log('Done!');
// };

const demoCameraPhoto = async () => {
  console.log('Calling android.cameraPhoto(`myman`)...');
  console.log(await android.cameraPhoto(`myman`));
  console.log('Done!');
};

const demoOpenFile = async () => {
  console.log('Calling android.openFile(`myman.jpg`)...');
  console.log(await android.openFile(`myman.jpg`));
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
  console.log('Exiting node...');
};


async function run() {
  const androidFunctions = [
    demoStart,
    demoEval,
    demoLs,
    // demoVibrate,
    demoCameraInfo,
    // demoSetUpStorage,
    demoCameraPhoto,
    demoOpenFile,
    // demoOpenURL,
    // demoDialogConfirm,
    demoEnd,
  ];
  for (const each of androidFunctions) {
    await each(); // call function to get returned Promise
  };
}

run();
