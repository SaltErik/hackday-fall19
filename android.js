'use strict';
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const apiPath = '/data/data/com.termux/files/usr/libexec/termux-api';

const call = (apiCall) => apiPath.concat(apiCall);

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});


class Android {

  constructor() {
    // Singleton pattern
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async vibrate(duration=1000, force=true) {
    const args = [];
    args.push(`--ei duration_ms ${duration}`);
    args.push(`--ez force ${force}`);
    try {
      return await execFile(call('Vibrate'), args);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfo() {
    try {
      return await execFile('/data/data/com.termux/files/usr/libexec/termux-api', ['CameraInfo']);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };

