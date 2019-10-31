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

  async rm(pathToFile) {
    const args = [`-f`, `${pathToFile}`];
    try {
      const { stderr } = await execFile(`rm`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async eval(command, ...args) {
    try {
      const { stdout, stderr } = await execFile(command, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
      if (stdout) return stdout;
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
      if (stderr) console.log(`STDERR: ${stderr}`)
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async cameraPhoto(saveAsName) {
    const args = [];
    if (!saveAsName) args.push(`${Date.now()}.jpg`);
    else args.push(`${saveAsName}.jpg`);
    try {
      const { stderr } = await execFile(`termux-camera-photo`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async openFile(pathToFile) {
    const args = [`${pathToFile}`];
    try {
      const { stderr } = await execFile(`termux-open`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async openURL(URL) {
    const args = [`${URL}`];
    try {
      const { stderr } = await execFile(`termux-open`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

  async dialogConfirm(title=`Title goes here`, hint=`Hint goes here`) {
    // -2: user clicks away
    // -1: answers yes?
     
    const args = [];
    if (!!title) args.push(`-t`, `${title}`);
    if (!!hint) args.push(`-i`, `${hint}`);
    try {
      const { stdout, stderr } = await execFile(`termux-dialog`, args);
      if (stderr) console.log(`STDERR: ${stderr}`);
      return JSON.parse(stdout);
    } catch (error) {
      console.log(`UH-OH! Something broke: ${error}`);
    }
  }

}


module.exports = { Android };
