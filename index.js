`use strict`;
const { promisify } = require(`util`);
const { execFile, execFileSync } = require(`child_process`);
const run = promisify(execFile);


class Android {

  constructor() {
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }


  async ls() {
    return await run(`ls`);
  }


  async rm(pathToFile) {
    const args = [`-f`, `${pathToFile}`];
    return await run(`rm`, args);
  }


  async touch(newFileName) {
    const args = [`${newFileName}`];
    return await run(`touch`, args);
  }


  async getCameraInfo() {
    return await run(`termux-camera-info`);
  }


  async takeFaceCamPhoto(saveAsName) {
    const args = [`-c`, `1`];
    if (saveAsName) args.push(`face_cam_${saveAsName}.jpg`);
    else args.push(`face_cam_${Date.now()}.jpg`);
    return await run(`termux-camera-photo`, args);
  }


  async takeBackCamPhoto(saveAsName) {
    const args = [`-c`, `0`];
    if (saveAsName) args.push(`back_cam_${saveAsName}.jpg`);
    else args.push(`back_cam_${Date.now()}.jpg`);
    return await run(`termux-camera-photo`, args);
  }


  async vibratePhone(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (force) args.push(`-f`);
    return await run(`termux-vibratePhone`, args);
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

}


module.exports = { Android };
