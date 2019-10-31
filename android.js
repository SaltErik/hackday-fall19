'use strict';
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const apiPath = '/data/data/com.termux/files/usr/libexec/termux-api';

const call = (apiCall) => apiPath.concat(apiCall);

class Android {

  constructor() {
    // Singleton pattern
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async vibrate(duration=1000, force=true) {
    const args = []
      .push(`--ei duration_ms ${duration}`)
      .push(`--ez force ${force}`);
    try {
      return await execFile(call('Vibrate'), args);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfoHI() {
    try {
      return await execFile('termux-camera-info');
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfoLO() {
    try {
      return await execFile('/data/data/com.termux/files/usr/libexec/termux-api', ['CameraInfo']);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };

