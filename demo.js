`use strict`;
const { Android } = require('./src');

// const android = new Android();

process.on('unhandledRejection', console.log);

const DEBUG = false;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const wrap = async (func, args) => {
  if (DEBUG) console.log(`\nwrap recieved func: ${func.name}`);
  if (DEBUG) console.log(`\nwrap recieved args: ${args}`);

  const safetyGoggles = async (func, args) => {
    if (DEBUG) console.log(`\nsafetyGoggles recieved func: ${func.name}`);
    if (DEBUG) console.log(`\nsafetyGoggles recieved args: ${args}`);
    if (DEBUG) console.log(`\ndecorated android.${func.name}() begin...`);
    try {
      return await android[`${func.name}`](args);
    } catch (error) {
      if (error.code === 'ENOENT') DEBUG ? console.log(`Not running on Android! That's fine. Skipping...`) : void (0);
      else throw error;
    }
    finally {
      if (DEBUG) console.log(`\ndecorated android.${func.name}() done!`)
    }
  }

  return await safetyGoggles(func, args);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const ls = async () => {
  const { stdout } = await wrap(android.ls);
  const result = await stdout.split(`\n`);
  console.log(await result.filter(async (string) => !!string));
};

const rm = async (pathToFile) => await wrap(android.rm, pathToFile);

const touch = async (newFileName) => await wrap(android.touch, newFileName);

const vibratePhone = async (msDuration) => await wrap(android.vibratePhone, msDuration);

const getCameraInfo = async () => {
    const { stdout } = await wrap(android.getCameraInfo);
    const cameras = await JSON.parse(await stdout);
    console.dir(await cameras, {colors: true, depth: null});
};

const getBackCameraInfo = async () => {
    const { stdout } = await wrap(android.getCameraInfo);
    const cameras = await JSON.parse(await stdout);
    console.log(await cameras[0]);
};

const getFrontCameraInfo = async () => {
    const { stdout } = await wrap(android.getCameraInfo);
    const cameras = await JSON.parse(await stdout);
    console.log(await cameras[1]);
};

const setUpStorage = async () => await wrap(android.setUpStorage);

const takeFaceCamPhoto = async (saveAsName) => await wrap(android.takeFaceCamPhoto, saveAsName);

const takeBackCamPhoto = async (saveAsName) => await wrap(android.takeBackCamPhotoSync, saveAsName);

const showFile = async (pathToFile) => await wrap(android.showFile, pathToFile);

const openURL = async (URL=`study-at-salt.com`) => await wrap(android.openURL, `https://${URL}`);

const showDialog = async () => {
    const { stdout } = await wrap(android.showDialog, `What is your favorite color?`, `Don't answer yellow...`);
    console.log(await JSON.parse(stdout));
};

const turnFlashlightOn = async () => await wrap(android.turnFlashlightOn);

const turnFlashlightOff = async () => await wrap(android.turnFlashlightOff);
 
const toggleFlashlight = async () => await wrap(android.toggleFlashlight);

const getLocationInfo = async () => await wrap(android.getLocationInfo);

const pwd = async () => await wrap(android.pwd);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const tactileDelete = async (fileName) => await Promise.all([vibratePhone(333), rm(`${fileName}`)]);

const tactileCreate = async (fileName) => await Promise.all([vibratePhone(333), touch(`${fileName}`)]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const reset = (coloredText) => `${coloredText}\u001b[0m`;

const bold = (text) => reset(`\u001b[1m${text}`);
const underline = (text) => reset(`\u001b[4m${text}`);
const reversed = (text) => reset(`\u001b[7m${text}`);

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const sleep = (delay=500) => new Promise(resolve => setTimeout(resolve, delay));

const wait = () => new Promise(resolve => setImmediate(resolve));

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const createAndDeleteFileDemo = [
  [rm, `foo.txt`],  // Pre-emptive cleanup
  [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Creating and deleting files')} ${brightGreen('<<<')}\n`],
  [console.log, `\nWe list the contents of the phone's current working directory using ${yellow('shell.ls()')}.\n`],
  [ls],
  [console.log, `\nNotice, no file named ${green('foo.txt')} exists.\n`],
  [console.log, `\nFair enough.\n`],
  [console.log, `\nSo we create an empty file named ${green('foo.txt')} using ${yellow("shell.touch('foo.txt')")}.\n`],
  [tactileCreate, `foo.txt`],
  [console.log, `\nWe then call ${yellow('shell.ls()')} a second time...\n`],
  [ls],
  [console.log, `\n...and there it is — ${green('foo.txt')} now exists.\n`],
  [console.log, `\nBut not for long!\n`],
  [console.log, `\nLet's delete it again, using ${yellow("shell.rm('foo.txt')")}!\n`],
  [tactileDelete, `foo.txt`],
  [console.log, `\nDid it work? Only one way to find out!\n`],
  [console.log, `\nWe call ${yellow('shell.ls()')} one last time, looking for ${green('foo.txt')}...\n`],
  [ls],
  [console.log, `\n...aaaaand it's gone.\n`],
];

const toggleFlashlightDemo = [
  [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Toggling the flashlight')} ${brightGreen('<<<')}\n`],
  [console.log, `\nWe ensure the flashlight is ${red('OFF')} before starting...\n`],
  [turnFlashlightOff],
  [console.log, `\nAnd so — assuming the flashlight is ${red('OFF')}...\n`],
  [console.log, `\nWe turn it ${green('ON')}...\n`],
  [toggleFlashlight],
  [console.log, `\n...and we turn it back ${red('OFF')}...\n`],
  [toggleFlashlight],
  [console.log, `\n...and we turn it back ${green('ON')} again...\n`],
  [toggleFlashlight],
  [console.log, `\n...and we finally turn it back ${red('OFF')}.\n`],
  [toggleFlashlight],
];

const getPhoneCameraInfo = [
  [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Retrieving camera information')} ${brightGreen('<<<')}\n`],
  [console.log, `\nWonder which cameras are available on this phone...\n`],
  [console.log, `\nLet's find out, by calling ${yellow('getCameraInfo()')}!\n`],
  [getCameraInfo],
  [console.log, `\nWhoah! That's a lot of info!\n`],
  [console.log, `\nLet's just focus on the front camera...\n`],
  [console.log, `\nAllright, calling ${yellow('getFrontCameraInfo()')}!\n`],
  [getFrontCameraInfo],
  [console.log, `\nThere — now that's better...\n`],
  [console.log, `\nAnd how about the back camera?\n`],
  [console.log, `\nWe call ${yellow('getBackCameraInfo()')}...\n`],
  [getBackCameraInfo],
  [console.log, `\nCool! So we know we have some cameras to work with.\n`],
];

const snapFaceCamAndShowPhoto = [
  [rm, `foo.txt`],  // Pre-emptive cleanup
  [rm, `dope_selfie.jpg`],  // Pre-emptive cleanup
  [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Snapping a photo and showing it to the user')} ${brightGreen('<<<')}\n`],
  [console.log, `\nCalling ${yellow('shell.ls()')}, we examine the contents of the current directory...\n`],
  [ls],
  [console.log, `\nDang. We've got no dope selfies of our user...\n`],
  [console.log, `\nWell, no problem. Let's snap a fresh pic with the face camera...\n`],
  [console.log, `\nSay cheese!\n`],
  [takeFaceCamPhoto, `dope_selfie`],
  [vibratePhone, 333],  // Some tactile feedback
  [console.log, `\nThere we are. How to tell if it saved properly?\n`],
  [console.log, `\nSame way as before — by calling ${yellow('shell.ls()')}.\n`],
  [ls],
  [console.log, `\nSee any "dope_selfie.jpg"?\n`],
  [console.log, `\n(I do!)\n`],
  [console.log, `\nAllright, let's display it to our user!\n`],
  [console.log, `\nCalling ${yellow("showFile('dope_selfie.jpg')")} as the final step...\n`],
  [showFile, `dope_selfie.jpg`],
  [console.log, `\nMy man!\n`],
];

const vibrationDemo = [
  [console.log, `\n\n${brightGreen('\t>>>')} ${bold('Feeling the vibrations')} ${brightGreen('<<<')}\n`],
  [console.log, `\nThe intentful stare (250ms vibration)...\n`],
  [vibratePhone, 250],
  [console.log, `\nThe throat-clearer (500ms vibration)...\n`],
  [vibratePhone, 500],
  [console.log, `\nThe shoulder tap (1000ms vibration)...\n`],
  [vibratePhone, 1000],
  [console.log, `\nThe prolonged sigh (2000ms vibration)\n`],
  [vibratePhone, 2000],
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const demoReels = [ // They may just be demoReels, but these ain't just demoFeels
  createAndDeleteFileDemo,
  toggleFlashlightDemo,
  vibrationDemo,
  getPhoneCameraInfo,
  snapFaceCamAndShowPhoto,
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const main = async () => {
  for (const reel of demoReels) {
    if (DEBUG) console.log(`\nRunning next demoReel...\n`);
    await sleep(1000);
    for (const demo of reel) {  // Runs consecutively on purpose
      const [demoFunction, demoArguments] = demo;
      if (DEBUG) console.log(`\nRunning next step in the current demo...\n`);
      await wait();
      await demoFunction(demoArguments);
      await sleep(666);
    }
  };
}

main();
