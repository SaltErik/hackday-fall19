'use strict';
const { Android } = require('../hackday-fall19');

const android = new Android();

process.on('unhandledRejection', console.log);

const wait = async () => await setTimeout(console.log, 100000000);

const ls = async () => {
  console.log('android.ls() begin...');
  const { stdout, stderr } = await android.ls();
  if (await stderr) console.log(`STDERR: ${await stderr}`);
  const result = await stdout.split(`\n`);
  console.log(await result.filter((string) => !!string));
  console.log('android.ls() done!');
};

const rm = async () => {
  console.log('android.rm() begin...');
  const pathToFile = `myman.jpg`;
  try {
    await android.rm();
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
    console.log(await android.vibrate());
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
    console.log(await JSON.parse(await android.getCameraInfo()));
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
    console.log(await android.setUpStorage());
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid storage not found! Skipping...`);
    else throw error;
  }
  finally {
    console.log('android.setUpStorage() done!');
  }
};

const takePhoto = async () => {
  console.log('android.takePhoto() begin...');
  try {
    console.log(await android.takePhoto(`myman`));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tCamera not found! Skipping...`);
    else throw error;
  } finally {
  console.log('android.takePhoto() done!');
  }
};

const openFile = async () => {
  console.log('android.openFile() begin...');
  const pathToFile = `myman.jpg`;
  try {
    console.log(await android.openFile(pathToFile));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\t"${pathToFile}" not found! Skipping...`);
    else throw error;
  }
  console.log('android.openFile() done!');
};

const openURL = async () => {
  console.log('android.openURL() begin...');
  try {
    console.log(await android.openURL(`https://www.study-at-salt.com`));
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
    console.log(await android.showConfirmDialog(`What is your favorite color?`, `Don't answer yellow...`));
  } catch (error) {
    if (error.code === 'ENOENT') console.log(`\tAndroid dialog not found! Skipping...`);
    else throw error;
  } finally {
    console.log('android.showConfirmDialog() done!');
  }
};


async function run() {
  const androidFunctions = [
    wait,
    ls,
    rm,
    vibrate,
    getCameraInfo,
    setUpStorage,
    takePhoto,
    openFile,
    openURL,
    showConfirmDialog,
  ];
  for (const each of androidFunctions) {
    await each();
  };
}

run();
