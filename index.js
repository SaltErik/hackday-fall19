`use strict`;
const { promisify } = require(`util`);
const run = promisify(require(`child_process`).execFile);


class Android {

  constructor() {
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async getCameraInfo() {
    return await run(`termux-camera-info`);
  }

  async takePhoto(saveAsName) {
    const args = [];
    if (saveAsName) args.push(`${saveAsName}.jpg`);
    else args.push(`${Date.now()}.jpg`);
    return await run(`termux-camera-photo`, args);
  }

  async ls() {
    return await run(`ls`);
  }

  async rm(pathToFile) {
    const args = [`-f`, `${pathToFile}`];
    return await run(`rm`, args);
  }

  async vibrate(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (force) args.push(`-f`);
    return await run(`termux-vibrate`, args);
  }

  async setUpStorage() {
    return await run(`termux-setup-storage`);
  }

  async openFile(pathToFile) {
    const args = [`${pathToFile}`];
    return await run(`termux-open`, args);
  }

  async openURL(URL) {
    const args = [`${URL}`];
    return await run(`termux-open`, args);
  }

  async showConfirmDialog(title=`Title goes here`, hint=`Hint goes here`) {
    // -2: user clicks away
    // -1: answers yes?
    const args = [];
    if (title) args.push(`-t`, `${title}`);
    if (hint) args.push(`-i`, `${hint}`);
    return await run(`termux-dialog`, args);
  }

}


module.exports = { Android };
