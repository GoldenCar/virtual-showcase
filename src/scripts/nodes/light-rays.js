import { Texture } from '@babylonjs/core';
import GLBNode from './glb-node';
import lightRaysGlb from 'url:../../models/light_rays.glb';
import lightRaysMaskPng from 'url:../../images/light-rays-mask.png';

export default class LightRaysNode extends GLBNode {
    
    constructor (name, scene) {
        super(lightRaysGlb, name);
        this.scene = scene;
    }

    imported (data) {
        super.imported(data);

        this.mesh.scaling.set(50, 50, 50);

        const material = this.scene.getMaterialByID('ray yellow');
        material.opacityTexture = new Texture(lightRaysMaskPng, this.scene);
    }
}
