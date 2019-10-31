`use strict`;
const { promisify } = require(`util`);
const execFile = promisify(require(`child_process`).execFile);


class Android {

  constructor() {
    // Singleton pattern
    if (!!Android.instance) return Android.instance;
    else Android.instance = this;
  }

  async ls() {
    try {
      const { stdout, stderr } = await execFile(`ls`);
      if (stderr) console.log(`STDERR: ${stderr}`);
      const result = stdout.split(`\n`);
      return result.filter((string) => !!string);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async vibrate(duration=1000, force=false) {
    const args = [`-d`, `${duration}`];
    if (!!force) args.push(`-f`);
    try {
      const { stderr } = await execFile(`termux-vibrate`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraInfo() {
    try {
      const { stdout, stderr } = await execFile(`termux-camera-info`);
      if (stderr) console.log(`STDERR: ${stderr}`);
      return JSON.parse(stdout)[0];
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async setUpStorage() {
    try {
      const { stderr } = await execFile(`termux-setup-storage`);
      if (stderr) console.log(`STDERR: ${stderr}`);
      return true; // I guess this makes sense here
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraPhoto(saveAsName) {
    const args = [];
    if (!!saveAsName) args.push(`${Date.now()}.jpg`);
    try {
      const { stdout, stderr } = await execFile(`termux-camera-photo`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async openFile(pathToFile) {
    const args = [`${pathToFile}`];
    try {
      const { stdout, stderr } = await execFile(`termux-camera-photo`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

}


module.exports = { Android };
