'use strict';
const { android } = require('./src');

// const android = new Android();

process.on('unhandledRejection', console.log);

const DEBUG = false;


//////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.touchFile() done!\n');
  }
};


const vibratePhone = async (ms) => {
  if (DEBUG) console.log('\nandroid.vibratePhone() begin...');
  try {
    await android.vibratePhone(ms);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.getCameraInfo() done!\n');
  }
};


const getBackCameraInfo = async () => {
  if (DEBUG) console.log('\nandroid.getCameraInfo() begin...');
  try {
    const { stdout } = await android.getCameraInfo();
    const cameras = await JSON.parse(stdout);
    console.log(await cameras[0]);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.getCameraInfo() done!\n');
  }
};


const getFrontCameraInfo = async () => {
  if (DEBUG) console.log('\nandroid.getCameraInfo() begin...');
  try {
    const { stdout } = await android.getCameraInfo();
    const cameras = await JSON.parse(stdout);
    console.log(await cameras[1]);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  }
  finally {
    if (DEBUG) console.log('android.setUpStorage() done!\n');
  }
};


const takeFaceCamPhoto = async (saveAsName) => {
  if (DEBUG) console.log('\nandroid.takeFaceCamPhoto() begin...');
  try {
    await android.takeFaceCamPhoto(saveAsName);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.takeFaceCamPhoto() done!\n');
  }
};


const takeBackCamPhoto = async (saveAsName) => {
  if (DEBUG) console.log('\nandroid.takeBackCamPhoto() begin...');
  try {
    await android.takeBackCamPhotoSync(saveAsName);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  }
  if (DEBUG) console.log('android.showFile() done!\n');
};


const openURL = async () => {
  if (DEBUG) console.log('\nandroid.openURL() begin...');
  try {
    await android.openURL(`https://www.study-at-salt.com`);
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
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
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.toggleFlashlight() done!\n');
  }
}

const getLocationInfo = async () => {
  if (DEBUG) console.log('\nandroid.getLocationInfo() begin...');
  try {
    await android.getLocationInfo();
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.getLocationInfo() done!\n');
  }
};


const clear = async () => {
  if (DEBUG) console.log('\nandroid.clear() begin...');
  try {
    await android.clear();
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.clear() done!\n');
  }
};

const pwd = async () => {
  if (DEBUG) console.log('\nandroid.pwd() begin...');
  try {
    await android.pwd();
  } catch (error) {
    if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
    else throw error;
  } finally {
    if (DEBUG) console.log('android.pwd() done!\n');
  }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////


const reset = (coloredText) => `${coloredText}\u001b[0m`; 
const black = (text) => reset(`\u001b[30m${text}`);
const red = (text) => reset(`\u001b[31m${text}`);
const green = (text) => reset(`\u001b[32m${text}`);
const yellow = (text) => reset(`\u001b[33m${text}`);
const blue = (text) => reset(`\u001b[34m${text}`);
const magenta = (text) => reset(`\u001b[35m${text}`);
const cyan = (text) => reset(`\u001b[36m${text}`);
const white = (text) => reset(`\u001b[37m${text}`);

const brightBlack = (text) => reset(`\u001b[30;1m${text}`);
const brightRed = (text) => reset(`\u001b[31;1m${text}`);
const brightGreen = (text) => reset(`\u001b[32;1m${text}`);
const brightYellow = (text) => reset(`\u001b[33;1m${text}`);
const brightBlue = (text) => reset(`\u001b[34;1m${text}`);
const brightMagenta = (text) => reset(`\u001b[35;1m${text}`);
const brightCyan = (text) => reset(`\u001b[36;1m${text}`);
const brightWhite = (text) => reset(`\u001b[37;1m${text}`);

const bold = (text) => reset(`\u001b[1m${text}`);
const underline = (text) => reset(`\u001b[4m${text}`);
const reversed = (text) => reset(`\u001b[7m${text}`);


const sleep = (delay=1000) => new Promise(resolve => setTimeout(resolve, delay));

const main = async () => {

  const createAndDeleteFileDemo = [
    [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Creating and deleting files')} ${brightGreen('<<<')}\n`],
    [rm, `foo.txt`],  // Pre-emptive cleanup
    [console.log, `\nWe list the contents of the phone's current working directory using ${brightYellow('shell.ls()')}.\n`],
    [ls],
    [console.log, `\nNotice, no file named ${red('foo.txt')} exists.\n`],
    [touchFile, `foo.txt`],
    [console.log, `\nWe create an empty ${brightYellow('foo.txt')} on the phone using ${brightYellow("shell.touch('foo.txt')")}...\n`],
    [ls],
    [console.log, `\n...and, Presto! Now ${brightYellow('foo.txt')} exists.\n`],
    [console.log, `\nBut not for long!\n`],
    [console.log, `\nWe invoke ${brightYellow("shell.rm('foo.txt')")}...\n`],
    [rm, `foo.txt`],
    [ls],
    [console.log, `\n...aaaaand it's gone.\n`],
  ];

  const toggleFlashlightDemo = [
    [console.log, `\nWe ensure the flashlight is OFF before starting...\n`],
    [turnFlashlightOff],
    [console.log, `\nAnd so -- assuming the flashlight is OFF...\n`],
    [toggleFlashlight],
    [console.log, `\nNow it should be ON instead...\n`],
    [toggleFlashlight],
    [console.log, `\nAnd now it should be OFF once again...\n`],
    [toggleFlashlight],
    [console.log, `\nAnd ON again...\n`],
    [toggleFlashlight],
    [console.log, `\nAnd finally OFF.\n`],
  ];

  const getPhoneCameraInfo = [
    [console.log, `\nWonder which cameras are available on this phone...'\n`],
    [console.log, `\nlet's find out!'\n`],
    [getCameraInfo],
    [console.log, `\nWhoah! That's a lot of info!\n`],
    [takeFaceCamPhoto, `test_photo`],
    [console.log, `\nLet's just focus on the front camera...\n`],
    [getFrontCameraInfo],
    [console.log, `\nThere, that's better...\n`],
    [console.log, `\nAnd how about the back camera?\n`],
    [getBackCameraInfo],
    [console.log, `\nCool! So we know we have some cameras to work with.\n`],
  ];

  const snapFaceCamAndShowPhoto = [
    [rm, `foo.txt`],  // Pre-emptive cleanup
    [console.log, `\nWe examine the contents of the current directory...'\n`],
    [ls],
    [console.log, `\nDang. We have no sweet selfies of our user...'\n`],
    [console.log, `\nWell, no problem. Let's snap a fresh pic with the face camera...'\n`],
    [console.log, `\nSay cheese!'\n`],
    [takeFaceCamPhoto, `dope_selfie`],
    [vibratePhone, `500`],  // Some tactile feedback
    [console.log, `\nThere we are. Did it save properly?'\n`],
    [ls],
    [console.log, `\nSee any "dope_selfie.jpg"?'\n`],
    [console.log, `\nAllright, let's dislay it to the user!'\n`],
    [showFile, `dope_selfie.jpg`],
    [console.log, `\nMy man!'\n`],
  ];

  const vibrationDemo = [
    [console.log, `\nThe intentful stare (250ms vibration)...'\n`],
    [vibratePhone, 250],
    [console.log, `\nThe throat-clearer (500ms vibration)...'\n`],
    [vibratePhone, 500],
    [console.log, `\nThe shoulder tap (1000ms vibration)...'\n`],
    [vibratePhone, 1000],
    [console.log, `\nThe prolonged sigh (2000ms vibration)'\n`],
    [vibratePhone, 2000],
  ];

  const demoReels = [
    createAndDeleteFileDemo,
    // toggleFlashlightDemo,
    // vibrationDemo,
    // getPhoneCameraInfo,
    // snapFaceCamAndShowPhoto,
  ];

  for (const reel of demoReels) {
    await clear();
    if (DEBUG) console.log(`\nRunning next demoReel...\n`);
    await sleep(0);  // Set above zero if it please you Sir
    for (const demo of reel) {  // Consecutive on purpose
      const [demoFunction, demoArguments] = demo;
      if (DEBUG) console.log(`\nRunning next step in the current demo...\n`);
      await sleep(500);
      await demoFunction(demoArguments);
    }
  };
}

main();
