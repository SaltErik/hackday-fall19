`use strict`;

module.exports.Shell = class Shell {

  constructor() {
    // Quantum superposition considered harmful
    if (!!State.instance) return State.instance;
    else State.instance = this;
  }

}
