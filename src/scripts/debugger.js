import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';

class Debugger {

  constructor() {
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyUp (e) {
    if (e.key === 'd') {
      console.log('less go');
      this.onShowInspector && this.onShowInspector();
    }
  }
}

export default Debugger;
