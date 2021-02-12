import {
    Color3,
    Color4,
    FadeInOutBehavior,
    ParticleSystem,
    Texture,
    Tools,
    Vector3
} from '@babylonjs/core';

import GLBNode from '../nodes/glb-node';
import LightRaysNode from '../nodes/light-rays';

import boxGlb from 'url:../../models/box.glb';
import particlePng from 'url:../../images/particle.png';
import sleep from '../helpers/sleep';
import bus from '../helpers/bus';
import animation from '../helpers/animation';
import colors from '../helpers/colors';

class Reveal {
    
    constructor (engine, environment, model) {
        this.engine = engine;
        this.environment = environment;
        this.scene = environment.scene;
        this.camera = environment.camera;

        this.box = new GLBNode(boxGlb, 'Box', this.scene);
        this.particles = new GLBNode(model.particles, 'Particles', this.scene);
        this.main = new GLBNode(model.main, 'Main', this.scene);
        this.lightRays = new LightRaysNode('LightRays', this.scene);

        Promise.all([
            this.box.load(),
            this.particles.load(),
            this.main.load(),
            this.lightRays.load(),
        ]).then(() => this.loaded());
    }

    loaded () {
        this.box.mesh.position.y = 20;
        this.environment.shadowGenerator.addShadowCaster(this.box.mesh, true);

        this.main.mesh.position = new Vector3(0, 50, 0);
        this.particles.mesh.position = new Vector3(0, 50, 0);

        performance.mark('a');
        this.main.setVisible(false);
        this.particles.setVisible(false);
        performance.mark('b');

        performance.measure('a to b', 'a', 'b');
        console.log(performance.getEntriesByType('measure'));

        bus.on('reveal-start', this.entrance.bind(this));
    }

    async entrance () {

        this.environment.setGroundColor(colors.ground.yellow);
        this.environment.setPedestalColor(colors.pedestal.yellow);
        this.environment.background.setGradient('yellow');

        this.environment.objectsShow();

        await sleep(2000);

        this.environment.objectsMaterialize();

        this.box.anim.start(false, 1, 0, 3.333);

        await sleep(3300);

        this.environment.objectsHide();

        this.environment.pedestalExit();
        this.environment.cameraWiggler.switchToControl();

        this.scene.clearColor = Color3.FromHexString('#BEBEBE');
        this.environment.setGroundColor(colors.ground.gray);
        this.environment.background.setGradient('gray');

        animation(this.camera, this.scene, 'CameraZoom', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            beta: this.camera.beta,
        }, {
            frame: 3 * 60,
            target: new Vector3(0, 50, 0),
            radius: 80,
            beta: Tools.ToRadians(70),
        } ]);

        animation(this.box.mesh, this.scene, 'BoxFloat', [ {
            frame: 0,
            position: this.box.mesh.position,
        }, {
            frame: 2 * 60,
            position: new Vector3(0, 50, 0),
        } ]);

        await sleep(2500);

        this.box.anim.start(false, 1, 3.333);

        await sleep(3000);

        this.environment.groundExit();

        this.particlesAnim = this.scene.getAnimationGroupByName('Particles');
        this.particlesAnim.start(false, 0.6);

        await sleep(400);

        this.particles.setVisible(true);

        await sleep(1200);

        this.box.setVisible(false);

        await sleep(2200);

        this.main.setVisible(true);

        await sleep(800);

        const plane = this.particles.mesh.getChildMeshes(true, node => node.id == 'Plane flash')[0];
        animation(plane, this.scene, 'PlaneFadeOut', [ {
            frame: 0,
            visibility: plane.visibility,
        }, {
            frame: 60,
            visibility: 0,
        }]);

        const particles = this.particles.mesh.getChildMeshes(true, node => node.id !== 'Plane flash');
        particles.forEach(particle => particle.visibility = 0);
        
        this.scene.clearColor = new Color4(0, 0, 0, 0);

        await sleep (1000);
        this.particles.setVisible(false);

        this.entered();
    }
};

export default Reveal;
