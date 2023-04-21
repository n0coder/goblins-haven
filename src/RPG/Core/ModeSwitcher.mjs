export class ModeSwitcher {
  constructor() {
    this.currentMode = null;
    this.modes = new Map();
  }
  
  addMode(name, mode) {
    this.modes.set(name.toLowerCase(), mode);
  }
  
  loadMode(name) {
    var modes = this.modes.get(name.toLowerCase());
    console.log([name.toLowerCase(), modes]);
    if (modes) {
      this.currentMode?.end();
      this.currentMode = modes;
      this.currentMode.start();
    }
  }
}

export const modeSwitcher = new ModeSwitcher();
