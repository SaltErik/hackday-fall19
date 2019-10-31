'use strict';
const { Android } = require('./android.js');

// User facing API
const android = new Android();

async function print() {
  console.log(await android.vibrate());
}

print();
