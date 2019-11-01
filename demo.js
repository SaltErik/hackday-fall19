'use strict';
const { Android } = require('../hackday-fall19');

const android = new Android();

process.on('unhandledRejection', console.log);

const longRun = async () => await setTimeout(console.log, 100000000);

const pause = async () => await setTimeout(console.log, 5000);

const DEBUG = true;


const ls = async () => {
  if (DEBUG) console.log('\nandroid.ls() begin...');
  const { stdout } = await android.ls();
  const result = await stdout.split(`\n`);
  console.log(await result.filter((string) => !!string));
  if (DEBUG) console.log('android.ls() done!\n');
};


const rm = async (pathToFile) => {
  if (DEBUG) console.log('\nandroid.rm() begin...');
  try {
    await android.rm(pathToFile);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.rm() done!\n');
  }
};

const touch = async (newFileName) => {  // Admittedly an ambigous name on a touch device
  if (DEBUG) console.log('\nandroid.touch() begin...');
  try {
    await android.touch(newFileName);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${newFileName}" not found! Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.touch() done!\n');
  }
};


const vibratePhone = async () => {
  if (DEBUG) console.log('\nandroid.vibratePhone() begin...');
  try {
    await android.vibratePhone();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tTiny rumbling hamster not found! Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.vibratePhone() done!\n');
  }
};


const getCameraInfo = async () => {
  if (DEBUG) console.log('\nandroid.getCameraInfo() begin...');
  try {
    const { stdout } = await android.getCameraInfo();
    console.log(await JSON.parse(stdout));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid camera not found! Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.getCameraInfo() done!\n');
  }
};


const setUpStorage = async () => {
  if (DEBUG) console.log('\nandroid.setUpStorage() begin...');
  try {
    await android.setUpStorage();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid storage not found! Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.setUpStorage() done!\n');
  }
};


const takeFaceCamPhoto = async (saveFileAs) => {
  if (DEBUG) console.log('\nandroid.getFaceCamPhoto() begin...');
  try {
    await android.takeFaceCamPhoto(saveFileAs);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tCamera not found! Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.takeFaceCamPhoto() done!\n');
  }
};


const takeBackCamPhoto = async (saveFileAs) => {
  if (DEBUG) console.log('\nandroid.takeBackCamPhoto() begin...');
  try {
    await android.takeBackCamPhotoSync(saveFileAs);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tCamera not found! Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.takeBackCamPhoto() done!\n');
  }
};


const showFile = async (pathToFile) => {
  if (DEBUG) console.log('\nandroid.showFile() begin...');
  try {
    await android.showFile(pathToFile);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  if (DEBUG) console.log('android.showFile() done!\n');
};


const openURL = async () => {
  if (DEBUG) console.log('\nandroid.openURL() begin...');
  try {
    await android.openURL(`https://www.study-at-salt.com`);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid browser not found! Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.openURL() done!\n');
  }
};


const showDialog = async () => {
  if (DEBUG) console.log('\nandroid.showDialog() begin...');
  try {
    const { stdout } = await android.showDialog(`What is your favorite color?`, `Don't answer yellow...`);
    console.log(await JSON.parse(stdout));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid dialog not found! Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.showDialog() done!\n');
  }
};


const snapAndShowFace = async () => {
  await rm(`face_cam_test.jpg`);
  await getFaceCamPhoto(`test`);
  await showFile(`face_cam_test.jpg`);
};


const snapAndShowBack = async () => {
  await rm(`back_cam_test.jpg`);
  await getBackCamPhoto(`test`);
  await showFile(`back_cam_test.jpg`);
};


async function run() {
  await longRun();
  const demoReel = [
    [ls],
    [touch, `dummyFile.txt`],
    [rm, `dummyFile.txt`],
  ];
  for (const eachDemo of demoReel) {  // Consecutive execution on purpose
    await eachDemo[0](eachDemo[1] ? eachDemo[1] : void(0)).then(pause);
  };
}

run();
