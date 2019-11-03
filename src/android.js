`use strict`;


module.exports.Android = class Android {

  constructor({ run, shell, state }) {
    // Quantum superposition considered harmful
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
    // Composition happens here
    this.run = run;
    this.state = state;
    this.shell = shell;
    // State is managed here
    this.flashlightIsOn = false;
  }

  async pwd() {
    return await this.run(`pwd`);
  }

  async clear() {
    return await this.run(`clear`);
  }

  async ls() {
    return await this.run(`ls`);
  }

  async rm(pathToFile) {
    const args = [`-f`, `${pathToFile}`];
    return await this.run(`rm`, args);
  }

  async touch(newFileName) {
    const args = [`${newFileName}`];
    return await this.run(`touch`, args);
  }

  async getCameraInfo() {
    return await this.run(`termux-camera-info`);
  }

  async takeFaceCamPhoto(saveAsName) {
    const args = [`-c`, `1`];
    if (saveAsName) args.push(`${saveAsName}.jpg`);
    else args.push(`${Date.now()}.jpg`);
    return await this.run(`termux-camera-photo`, args);
  }

  async takeBackCamPhoto(saveAsName) {
    const args = [`-c`, `0`];
    if (saveAsName) args.push(`${saveAsName}.jpg`);
    else args.push(`${Date.now()}.jpg`);
    return await this.run(`termux-camera-photo`, args);
  }

  async getLocationInfo() {
    return await this.run(`termux-location`);
  }

  async vibratePhone(duration=1000, force=true) {
    const args = [`-d`, `${duration}`];
    if (force) args.push(`-f`);
    return await this.run(`termux-vibrate`, args);
  }

  async setUpStorage() {
    return await this.run(`termux-setup-storage`);
  }

  async showFile(pathToFile) {
    const args = [`${pathToFile}`];
    return await this.run(`termux-open`, args);
  }

  async openURL(URL) {
    const args = [`${URL}`];
    return await this.run(`termux-open`, args);
  }

  async showDialog(title=`Title goes here`, hint=`Hint goes here`) {
    // -2: user clicks away
    // -1: answers yes?
    const args = [];
    if (title) args.push(`-t`, `${title}`);
    if (hint) args.push(`-i`, `${hint}`);
    return await this.run(`termux-dialog`, args);
  }

  async turnFlashlightOn() {
    await this.setFlashlight(true);
    const args = [`on`];
    return await this.run(`termux-torch`, args);
  }

  async setFlashlight(boolean) {
    this.flashlightIsOn = boolean;
    return await new Promise(resolve => setImmediate(resolve));
  }

  async turnFlashlightOff() {
    await this.setFlashlight(false);
    const args = [`off`];
    return await this.run(`termux-torch`, args);
  }

  async toggleFlashlight() {
    if (this.flashlightIsOn) {
      return await this.turnFlashlightOff();
    } else {
      return await this.turnFlashlightOn();
    }
  }

}
