'use strict';
const promisify = require('util').promisify;
const execFile = promisify(require('child_process').execFile);

async function whenCleanupIsDesired() {
  try {
    return await execFile('noder', ['--version']);
  } catch (error) {
    console.log(`Cleanup happens here!`);
    // Any cleanup or extra handling goes here
    throw error; // Rethrow error (without wrapping it) to preserve original stack trace
  }
}

async function whenNoCleanupIsDesired() {
  return await execFile('noder', ['--version']);
}

async function run() {
  try {
    await whenCleanupIsDesired();
    await whenNoCleanupIsDesired();
  } catch (error) {
    console.log(`handled in the end!`);
    console.log(error);
  }
}

run();