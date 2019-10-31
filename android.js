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
      const { stdout } = await execFile(`ls`);
      return stdout;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async vibrate(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (!!force) args.push(`-f`);
    try {
      await execFile(`termux-vibrate`, args);
      return true;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
      return false;
    }
  }

  async cameraInfo() {
    try {
      const promise = await execFile(`termux-camera-info`);
      const [result] = await JSON.parse(promise.stdout);
      return await result;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };
