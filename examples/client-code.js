'use strict';

// How I imagine a client might write code that utilizes the Android library

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
  