`use strict`;
const { promisify } = require(`util`);
const { execFile, execFileSync } = require(`child_process`);
const run = promisify(execFile);


class Android {

  constructor() {
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
    this.flashlightIsOn = false;
  }


  async ls() {
    return await run(`ls`);
  }


  async rm(pathToFile) {
    const args = [`-f`, `${pathToFile}`];
    return await run(`rm`, args);
  }


  async touchFile(newFileName) {
    const args = [`${newFileName}`];
    return await run(`touch`, args);
  }


  async getCameraInfo() {
    return await run(`termux-camera-info`);
  }


  async takeFaceCamPhoto(saveAsName) {
    const args = [`-c`, `1`];
    if (saveAsName) args.push(`${saveAsName}.jpg`);
    else args.push(`${Date.now()}.jpg`);
    return await run(`termux-camera-photo`, args);
  }


  async takeBackCamPhoto(saveAsName) {
    const args = [`-c`, `0`];
    if (saveAsName) args.push(`${saveAsName}.jpg`);
    else args.push(`${Date.now()}.jpg`);
    return await run(`termux-camera-photo`, args);
  }

  async getLocationInfo() {
    return await run(`termux-location`);
  }

  async vibratePhone(duration=1000, force=true) {
    const args = [`-d`, `${duration}`];
    if (force) args.push(`-f`);
    return await run(`termux-vibrate`, args);
  }


  async setUpStorage() {
    return await run(`termux-setup-storage`);
  }


  async showFile(pathToFile) {
    const args = [`${pathToFile}`];
    return await run(`termux-open`, args);
  }


  async openURL(URL) {
    const args = [`${URL}`];
    return await run(`termux-open`, args);
  }


  async showDialog(title=`Title goes here`, hint=`Hint goes here`) {
    // -2: user clicks away
    // -1: answers yes?
    const args = [];
    if (title) args.push(`-t`, `${title}`);
    if (hint) args.push(`-i`, `${hint}`);
    return await run(`termux-dialog`, args);
  }


  async turnFlashlightOn() {
    this.flashlightIsOn = true;
    const args = [`on`];
    return await run(`termux-torch`, args);
  }


  async turnFlashlightOff() {
    this.flashlightIsOn = false;
    const args = [`off`];
    return await run(`termux-torch`, args);
  }

  async toggleFlashlight() {
    if (this.flashlightIsOn) {
      return await this.turnFlashlightOff();
    } else {
      return await this.turnFlashlightOn();
    }
  }

}


module.exports = { Android };
