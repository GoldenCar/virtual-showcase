import { Tools } from "@babylonjs/core";

export default class CameraWiggler {
    
    constructor (camera, canvas) {
        this.camera = camera;
        this.canvas = canvas;

        this.mousemove = this.mousemove.bind(this);
    }

    switchToWiggle () {
        this.camera.detachControl();
        this.canvas.addEventListener('mousemove', this.mousemove);
    }

    switchToControl () {
        this.camera.attachControl(this.canvas, true);
        this.canvas.removeEventListener('mousemove', this.mousemove);
    }

    mousemove (e) {
        const x = e.offsetX;
        const y = e.offsetY;

        const width = this.canvas.width;
        const height = this.canvas.height;

        const cx = width / 2;
        const cy = height / 2;

        const dx = x - cx;
        const dy = y - cy;

        const da = dx / 80;
        const db = dy / 100;

        this.camera.alpha = Tools.ToRadians(90 + da);
        this.camera.beta = Tools.ToRadians(85 + db);
    }
}
