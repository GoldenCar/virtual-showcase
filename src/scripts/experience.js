import { Engine } from '@babylonjs/core';
import '@babylonjs/loaders/glTF/2.0/glTFLoader';

import Environment from './environment';
import SurfaceLaptop313Reveal from './reveals/surface-laptop-3-13';
import SurfaceLaptop315Reveal from './reveals/surface-laptop-3-15';

import Debugger from './debugger';
const debug = new Debugger();

export default function () {
    const quality = new URLSearchParams(window.location.search).has('quality');

    const canvas = document.getElementById('render');
    const engine = new Engine(canvas, true, { alpha: true }, quality);

    const environment = new Environment(engine, canvas);
    environment.load();

    const reveal = new SurfaceLaptop313Reveal(engine, environment);

    document.addEventListener('keyup', (e) => {
        if (e.key === 'p') {
        reveal.entrance();
        }
    });

    debug.onShowInspector = () => environment.scene.debugLayer.show({ globalRoot: document.body });

    engine.runRenderLoop(function () {
        environment.scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
};
