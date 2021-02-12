import { RenderTargetTexture, Layer, EffectWrapper, EffectRenderer, DynamicTexture } from "@babylonjs/core";
import colors from "../helpers/colors";
import anime from 'animejs/lib/anime.es.js';

const shader = `
    varying vec2 vUV;

    uniform vec3 c1;
    uniform vec3 c2;

    void main(void) {
        gl_FragColor = vec4(mix(c2, c1, vUV.y), 1.0);
    }
`;

class BackgroundLayer {

    constructor (scene, engine) {

        const layer = new Layer('BackgroundLayer', null, scene);
        this.texture = new DynamicTexture('BackgroundTexture', { width: 1, height: 512 }, scene);

        layer.isBackground = true;
        layer.texture = this.texture;

        this.gradient = Object.assign({}, colors.background['gray']);
    }

    setGradient (color) {
        const gradient = colors.background[color];
        
        const ctx = this.texture.getContext();

        anime({
            targets: this.gradient,
            c1: gradient.c1,
            c2: gradient.c2,
            duration: 2000,
            easing: 'linear',
            update: () => {
                const linearGradient = ctx.createLinearGradient(0, 0, 1, 512);

                linearGradient.addColorStop(0, this.gradient.c1);
                linearGradient.addColorStop(1, this.gradient.c2);
        
                ctx.fillStyle = linearGradient;
                ctx.fillRect(0, 0, 1, 512);
        
                this.texture.update();
            },
        });
    }
}

export default BackgroundLayer;
