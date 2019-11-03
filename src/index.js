// Ye Olde composition root (project-wide, for now)
`use strict`;

// Node built-ins
const { promisify } = require(`util`);
const { execFile } = require(`child_process`);

// God class
const { Android } = require('./android.js');

// Custom components
const { State } = require('./state.js');
const { Shell } = require('./shell.js');

dependencies = {
  run: promisify(execFile),  // overall execution strategy
  state: new State(),  // State is meant to live here... One day...
  shell: new Shell(),  // provide shell commands
};

const android = new Android(dependencies);  // Constructor injection

const proxiedAndroid = new Proxy(android, {
  construct(target, argsList, newTarget) {
    return android;
  },
});

module.exports.Android = proxiedAndroid;
