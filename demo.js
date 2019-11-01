'use strict';
const { Android } = require('../hackday-fall19');

const android = new Android();

process.on('unhandledRejection', console.log);

const longRun = async () => await setTimeout(console.log, 100000000);

const pause = async () => await setTimeout(console.log, 5000);

const ls = async () => {
  console.log('android.ls() begin...');
  const { stdout, stderr } = await android.ls();
  if (await stderr) console.log(`STDERR: ${await stderr}`);
  const result = await stdout.split(`\n`);
  console.log(await result.filter((string) => !!string));
  console.log('android.ls() done!');
};

const rm = async (pathToFile) => {
  console.log('android.rm() begin...');
  try {
    await android.rm(pathToFile);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  finally {
    console.log('android.rm() done!');
  }
};

const vibrate = async () => {
  console.log('android.vibrate() begin...');
  try {
    await android.vibrate();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tTiny rumbling hamster not found! Skipping...`);
    else throw error;
  }
  finally {
    console.log('android.vibrate() done!');
  }
};

const getCameraInfo = async () => {
  console.log('android.getCameraInfo() begin...');
  try {
    const { stdout } = await android.getCameraInfo();
    console.log(await JSON.parse(stdout));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid camera not found! Skipping...`);
    else throw error;
  }
  finally {
    console.log('android.getCameraInfo() done!');
  }
};

const setUpStorage = async () => {
  console.log('android.setUpStorage() begin...');
  try {
    await android.setUpStorage();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid storage not found! Skipping...`);
    else throw error;
  }
  finally {
    console.log('android.setUpStorage() done!');
  }
};

const getFaceCamPhoto = async (saveFileAs) => {
  console.log('android.getFaceCamPhoto() begin...');
  try {
    await android.getFaceCamPhoto(saveFileAs);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tCamera not found! Skipping...`);
    else throw error;
  } finally {
  console.log('android.getFaceCamPhoto() done!');
  }
};

const getBackCamPhoto = async (saveFileAs) => {
  console.log('android.getBackCamPhoto() begin...');
  try {
    await android.getBackCamPhoto(saveFileAs);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tCamera not found! Skipping...`);
    else throw error;
  } finally {
  console.log('android.getBackCamPhoto() done!');
  }
};

const showFile = async (pathToFile) => {
  console.log('android.showFile() begin...');
  try {
    await android.showFile(pathToFile);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  console.log('android.showFile() done!');
};

const showFileSync = async (pathToFile) => {
  console.log('android.showFile() begin...');
  try {
    await android.showFile(pathToFile);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  console.log('android.showFile() done!');
};

const openURL = async () => {
  console.log('android.openURL() begin...');
  try {
    await android.openURL(`https://www.study-at-salt.com`);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid browser not found! Skipping...`);
    else throw error;
  } finally {
    console.log('android.openURL() done!');
  }
};


const showConfirmDialog = async () => {
  console.log('android.showConfirmDialog() begin...');
  try {
    const { stdout } = await android.showConfirmDialog(`What is your favorite color?`, `Don't answer yellow...`);
    console.log(await JSON.parse(stdout));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid dialog not found! Skipping...`);
    else throw error;
  } finally {
    console.log('android.showConfirmDialog() done!');
  }
};

const snapAndShowFace = () => {
  rmSync(`face_cam_test.jpg`);
  getFaceCamPhoto(`test`);
  showFileSync(`face_cam_test.jpg`);
};

const snapAndShowBack = () => {
  rmSync(`back_cam_test.jpg`);
  getBackCamPhoto(`test`);
  showFileSync(`back_cam_test.jpg`);
};


async function run() {
  const androidFunctions = [
    longRun,
    ls,
    rm,
    vibrate,
    getCameraInfo,
    setUpStorage,
    // getBackCamPhoto,
    // showFileSync,
    // getFaceCamPhoto,
    // showFileSync,
    snapAndShowFace,
    pause,
    snapAndShowBack,
    pause,
    // showConfirmDialog,
    // openURL,
  ];
  for (const each of androidFunctions) {
    await each();
  };
}

run();
