'use strict';
const { Android } = require('../hackday-fall19');

const android = new Android();

process.on('unhandledRejection', console.log);

const longRun = async (ms=10000000) => await setTimeout(console.log, ms);

const pause = async (ms=1000) => {
  if (DEBUG) console.log(`pause...`);
  return await setTimeout(console.log, ms);}

const DEBUG = false;


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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.rm() done!\n');
  }
};

const touchFile = async (newFileName) => {
  if (DEBUG) console.log('\nandroid.touchFile() begin...');
  try {
    await android.touchFile(newFileName);
  } catch (error) {
    console.log(`TOUCHFILE:`, error);
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.touchFile() done!\n');
  }
};


const vibratePhone = async () => {
  if (DEBUG) console.log('\nandroid.vibratePhone() begin...');
  try {
    await android.vibratePhone();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  }
  if (DEBUG) console.log('android.showFile() done!\n');
};


const openURL = async () => {
  if (DEBUG) console.log('\nandroid.openURL() begin...');
  try {
    await android.openURL(`https://www.study-at-salt.com`);
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
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
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.showDialog() done!\n');
  }
};


const turnFlashlightOn = async () => {
  if (DEBUG) console.log('\nandroid.turnFlashlightOn() begin...');
  try {
    await android.turnFlashlightOn();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.turnFlashlightOn() done!\n');
  }
}


const turnFlashlightOff = async () => {
  if (DEBUG) console.log('\nandroid.turnFlashlightOff() begin...');
  try {
    await android.turnFlashlightOff();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.turnFlashlightOff() done!\n');
  }
}


const toggleFlashlight = async () => {
  if (DEBUG) console.log('\nandroid.toggleFlashlight() begin...');
  try {
    await android.toggleFlashlight();
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`Not running on Android! That's fine. Skipping...`);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.toggleFlashlight() done!\n');
  }
}


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

  const createAndDeleteFileDemo = [
    [console.log, `\nDEMO: We list the contents of the phone's working directory...\n`],
    [ls],
    [console.log, `\nDEMO: Notice, no file named "dummyFile.txt" exists...\n`],
    [touchFile, `dummyFile.txt`],
    [console.log, `\nDEMO: We run the shell "touch" command on the phone...\n`],
    [ls],
    [console.log, `\nDEMO: Presto! Now "dummyfile.txt" exists...\n`],
    [rm, `dummyFile.txt`],
    [console.log, `\nDEMO: We run the shell "rm" command on "dummyFile.txt"...\n`],
    [ls],
    [console.log, `\nDEMO: ...aaaaand it's gone.\n`],
  ];

  const toggleFlashlightDemo = [
    [console.log, `\nDEMO: We ensure the flashlight is OFF before starting...\n`],
    [turnFlashlightOff]
    [console.log, `\nDEMO: And so -- assuming the flashlight is OFF...\n`],
    [toggleFlashlight],
    [console.log, `\nDEMO: Now it should be ON instead...\n`],
    [toggleFlashlight],
    [console.log, `\nDEMO: And now it should be OFF once again...\n`],
  ];

  // const gpsDemo = [

  // ];

  const demoReels = [
    // toggleFlashlightDemo,
    createAndDeleteFileDemo,
  ];

  for await (const eachReel of demoReels) {  // Runs consecutively on purpose
    await pause().then(DEBUG ? console.log(`\nDEMO: Running next reel...\n`) : void(0));
    for await (const eachDemo of eachReel) {
      await pause().then(await eachDemo[0](eachDemo[1] ? eachDemo[1] : void(0)));
    }
  };
}

run();
