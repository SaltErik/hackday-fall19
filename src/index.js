// Ye Olde composition root (project-wide, for now)
`use strict`;

// Node built-ins
const { promisify } = require(`util`);
const { execFile } = require(`child_process`);

// God class
const { Android } = require('./android.js');

// Self-explanatory
dependencies = {
  run: promisify(execFile),  // Overall execution strategy
};

const android = new Android(dependencies);  // Constructor injection

module.exports.android = android
