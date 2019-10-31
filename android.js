'use strict';
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);

const apiPath = '/data/data/com.termux/files/usr/libexec/termux-api '; // Intentional whitespace at the end

const _call = (apiMethod) => apiPath.concat(apiMethod);


class Android {

  constructor() {
    // Singleton pattern
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async ls() {
    try {
      return await execFile('ls');
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async vibrate(duration=1000, force=true) {
    const args = [];
    args.push(`--ei duration_ms ${duration}`);
    args.push(`--ez force ${force}`);
    try {
      return await execFile(_call('Vibrate'), args);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfo() {
    try {
      return await execFile(_call('CameraInfo'));
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };
