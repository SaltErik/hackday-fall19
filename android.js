'use strict';
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);


class Android {

  constructor() {
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async vibrate(duration=1000, force=true) {
    try {
      return await execFile('termux-vibrate', ['-d', `${duration}`, '-f']);
    } catch (error) {
      console.log(`Something broke: ${error}`);
    }
  }
}


module.exports = { Android };
