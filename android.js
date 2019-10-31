`use strict`;
const { promisify } = require(`util`);
const execFile = promisify(require(`child_process`).execFile);


const _call = (apiMethod) => apiPath.concat(apiMethod);


class Android {

  constructor() {
    // Singleton pattern
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async ls() {
    try {
      return await execFile(`ls`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async vibrate(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (!!force) args.push(`-f`);
    try {
      return await execFile(`termux-vibrate`, args);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfo() {
    try {
      return await execFile(`termux-camera-info`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };
