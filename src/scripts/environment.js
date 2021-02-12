import { ArcRotateCamera, Color3, CubeTexture, Vector3, Scene, Tools, HemisphericLight, Color4, DirectionalLight,
    ShadowGenerator, Texture } from '@babylonjs/core';

import CameraWiggler from './helpers/camera-wiggler';
import GLBNode from './nodes/glb-node';

import animation from './helpers/animation';
import bus from './helpers/bus';
import blobTransparentPng from 'url:../images/blob-transparent.png';
import objectChairGlb from 'url:../models/object_chair.glb';
// import objectKeyboardGlb from 'url:../models/object_keyboard.glb';
import objectPlantGlb from 'url:../models/object_plant.glb';
import objectScreenGlb from 'url:../models/object_screen.glb';
import pedestalGlb from 'url:../models/pedestal.glb';
import warehouseEnv from 'url:../envs/warehouse.env';
import sleep from './helpers/sleep';
import colors from './helpers/colors';
import BackgroundLayer from './layer/background';

const defaultConfig = {
    env: 'empty_warehouse_01_16k_1024',
    disablePan: false,
};

class Environment {

    constructor (engine, canvas, config) {
        config = Object.assign({}, defaultConfig, config);

        this.scene = new Scene(engine);
        this.scene.autoClear = false;
        this.scene.autoClearDepthAndStencil = false;
 
        this.camera = new ArcRotateCamera(
            'Camera',
            Tools.ToRadians(90), // Alpha
            Tools.ToRadians(85), // Beta
            200, // Radius
            new Vector3(0, 30, 0),
            this.scene,
        );
        this.camera.minZ = 0.1;
        this.camera.maxZ = 1600;
        this.camera.lowerRadiusLimit = 5;
        this.camera.upperRadiusLimit = 200;
        if (config.disablePan) { this.camera.panningDistanceLimit = Number.MIN_VALUE; }
        this.camera.angularSensibilityX = 2000;
        this.camera.angularSensibilityY = 2000;
        this.camera.pinchPrecision = 200 / this.camera.radius;
        this.camera.wheelDeltaPercentage = 0.002;
        this.camera.pinchDeltaPercentage = 0.01;
        this.camera.attachControl(canvas, true);

        this.cameraWiggler = new CameraWiggler(this.camera, canvas);
        //this.cameraWiggler.switchToWiggle();

        new HemisphericLight('HemiLightDown', new Vector3(0, 1, 0), this.scene).intensity = 1.8;
        new HemisphericLight('HemiLightUp', new Vector3(0, -1, 0), this.scene).intensity = 0.5;
        
        const sun = new DirectionalLight('Sun', new Vector3(-0.5, -1, 0), this.scene);
        sun.shadowMinZ = -60;
        sun.shadowMaxZ = 30;
        this.shadowGenerator = new ShadowGenerator(1024, sun);
        this.shadowGenerator.useContactHardeningShadow = true;

        const envTex = CubeTexture.CreateFromPrefilteredData(warehouseEnv, this.scene);
        const groundTex = new Texture(blobTransparentPng, this.scene);
        groundTex.hasAlpha = true;

        this.background = new BackgroundLayer(this.scene, engine);
        this.background.setGradient('gray');

        this.env = this.scene.createDefaultEnvironment({
            cameraExposure: 1.0,
            cameraContrast: 1.5,
            environmentTexture: envTex,
            createSkybox: false,
            createGround: true,
            groundSize: 1500,
            groundTexture: groundTex,
            groundColor: colors.ground.gray,
            groundOpacity: 1,
            enableGroundShadow: true,
        });

        this.scene.environmentIntensity = 0.8;
        this.scene.environmentTexture.rotationY = Tools.ToRadians(210);

        this.pedestal = new GLBNode(pedestalGlb, 'Pedestal', this.scene);
        this.objectChair = new GLBNode(objectChairGlb, 'ObjectChair', this.scene);
        // this.objectKeyboard = new GLBNode(objectKeyboardGlb, 'ObjectKeyboard', this.scene);
        this.objectPlant = new GLBNode(objectPlantGlb, 'ObjectPlant', this.scene);
        // this.objectScreen = new GLBNode(objectScreenGlb, 'ObjectScreen');

        this.objects = [ this.objectChair, this.objectPlant ];

        bus.on('pedestal-exit', () => this.pedestalExit());
    }

    async load () {
        await Promise.all([
            this.pedestal.load(),
            this.objectChair.load(),
            // this.objectKeyboard.load(),
            this.objectPlant.load(),
            // this.objectScreen.load(),
        ]);

        this.pedestal.material = this.scene.getMaterialByID('Clay Pedestal');

        this.objectChair.mesh.position.set(19, 17.5, 8);
        // this.objectKeyboard.mesh.position.set(-15, 19, 23)
        // this.objectKeyboard.mesh.rotationQuaternion = null;
        // this.objectKeyboard.mesh.rotation.set(0, Tools.ToRadians(165), 0);
        this.objectPlant.mesh.position.set(-18, 17.4, 6);

        this.setPedestalColor(colors.pedestal.gray);

        this.objectsHide();

        this.scene.getMeshByID('PedestalMesh').receiveShadows = true;
        this.shadowGenerator.addShadowCaster(this.pedestal.mesh);
    }

    async objectsMaterialize () {
        this.objects.forEach(object => object.anim.start(false, 0.8));

        await sleep(1000);

        animation(this.objectChair.mesh, this.scene, 'ChairParticleShift', [ {
            frame: 0,
            position: this.objectChair.mesh.position,
        }, {
            frame: 25,
            position: new Vector3(24, 20, 2),
        } ]);

        // animation(this.objectKeyboard.mesh, this.scene, 'KeyboardParticleShift', [ {
        //     frame: 0,
        //     position: this.objectKeyboard.mesh.position,
        // }, {
        //     frame: 20,
        //     position: new Vector3(23, 20, -4),
        // } ]);

        animation(this.objectPlant.mesh, this.scene, 'PlantParticleShift', [ {
            frame: 0,
            position: this.objectPlant.mesh.position,
        }, {
            frame: 25,
            position: new Vector3(23, 20, 2),
        } ]);
    }

    objectsShow () {
        this.objects.forEach(object => object.setVisible(true));
    }

    objectsHide () {
        this.objects.forEach(object => object.setVisible(false));
    }

    async pedestalExit () {
        const positionAnim = animation(this.pedestal.mesh, this.scene, 'PedestalDrop', [ {
            frame: 0,
            position: this.pedestal.mesh.position,
        },  {
            frame: 1 * 60,
            position: new Vector3(0, -20, 0),
        } ]);

        const pedestalMesh = this.scene.getMeshByID('PedestalMesh');
        const visibilityAnim = animation(pedestalMesh, this.scene, 'PedestalFadeOut', [ {
            frame: 0,
            visibility: pedestalMesh.visibility,
        }, {
            frame: 50,
            visibility: pedestalMesh.visibility,
        }, {
            frame: 55,
            visibility: 0,
        } ]);

        await Promise.all([ positionAnim.waitAsync(), visibilityAnim.waitAsync() ]);
    }

    setGroundColor (color) {
        animation(this.env.groundMaterial, this.scene, 'GroundColor', [ {
            frame: 0,
            primaryColor: this.env.groundMaterial.primaryColor,
        }, {
            frame: 1 * 60,
            primaryColor: color,
        } ])
    }

    setPedestalColor (color) {
        animation(this.pedestal.material, this.scene, 'PedestalColor', [ {
            frame: 0,
            albedoColor: this.pedestal.material.albedoColor,
        }, {
            frame: 1 * 60,
            albedoColor: color,
        } ]);
    }

    async groundExit () {
        return animation(this.env.groundMaterial, this.scene, 'GroundFade', [ {
            frame: 0,
            alpha: this.env.groundMaterial.alpha,
        }, {
            frame: 1 * 60,
            alpha: 0,
        } ]);
    }
}

export default Environment;
