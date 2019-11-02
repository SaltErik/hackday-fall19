// Ye olde composition root (project-wide, for now)
`use strict`;

// Node built-ins
const { promisify } = require(`util`);
const { execFile } = require(`child_process`);

// God class
const { Android } = require('./android.js');

// Custom components
const { State } = require('./state.js');
const { Shell } = require('./shell.js');

// Use null to say "unavailable in the current environment"
dependencies = {
  run: promisify(execFile),  // overall execution strategy
  state: new State(),  // encapsulate phone state
  shell: new Shell(),  // provide shell commands
};

const android = new Android(dependencies);  // Constructor injection

const proxyHandler = {

};

const proxiedAndroid = new Proxy(android, proxyHandler);

module.exports.Android = proxiedAndroid;

// from exploringjs.com/es6/ch_proxies.html#_revocable-references
// function createRevocableReference(target) {
//   const handler = {}; // forward everything
//   const { proxy, revoke } = Proxy.revocable(target, handler);
//   return { reference: proxy, revoke };
// }