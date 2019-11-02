// Bunch of getters and/or setters that perform computed lookups and/or memoize results
`use strict`;


module.exports.State = class State {

  constructor() {
    // Quantum superposition considered harmful
    if (!!State.instance) return State.instance;
    else State.instance = this;
  }

}

// const ProxiedClass = new Proxy(State, {
//   construct(target, argArray, newTarget) {
//     return new target(...argArray);
//   },
// });

// module.exports.State = ProxiedClass;
