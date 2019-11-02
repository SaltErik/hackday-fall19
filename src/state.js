// Bunch of getters and/or setters that perform computed lookups and/or memoize results
`use strict`;

module.exports.State = class State {

  constructor() {
    // Quantum superposition considered harmful
    if (!!State.instance) return State.instance;
    else State.instance = this;
    // State begins
    this.flashlightIsOn = null; // Begin in an unknown state
  }

  get flashlight() {
    return this.flashlight;
  }

  set flashlightOn() {
    if (to === false)
    if (to === true)
  }

  set flashlightOff() {
    if (to === false)
    if (to === true)
  }

  set flashlightToggle() {
    if (to === false)
    if (to === true)
  }

}
