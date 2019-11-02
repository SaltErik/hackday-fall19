`use strict`;

module.exports.Shell = class Shell {

  constructor() {
    // Quantum superposition considered harmful
    if (!!Shell.instance) return Shell.instance;
    else Shell.instance = this;
  }

}
