'use strict';

import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls(camera, render.domElement);
controls.target = new Vector3(0, 3, 0);
controls.minDistance = 1.5;
controls.maxDistance = 180;

camera.position.set(8, 16, 24);
controls.update();

(function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
})();
