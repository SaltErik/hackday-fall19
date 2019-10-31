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
      const promise = await execFile(`ls`);
      if (promise.stderr) console.log(`STDERR: ${promise.stderr}`);
      const parsed = promise.stdout.split(`\n`);
      const result = parsed.filter((string) => !!string);
      return result;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async vibrate(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (!!force) args.push(`-f`);
    try {
      const promise = await execFile(`termux-vibrate`, args);
      if (promise.stderr) console.log(`STDERR: ${promise.stderr}`);
      return true;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
      return false;
    }
  }

  async cameraInfo() {
    try {
      const promise = await execFile(`termux-camera-info`);
      if (promise.stderr) console.log(`STDERR: ${promise.stderr}`);
      const [result] = await JSON.parse(promise.stdout);
      return await result;
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }
}


module.exports = { Android };
