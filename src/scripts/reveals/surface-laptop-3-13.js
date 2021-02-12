import { Color3, Texture, Tools, Vector3, VideoTexture } from '@babylonjs/core';
import playButton from '../nodes/play-button';
import Reveal from './reveal';
import animation from '../helpers/animation';
import sleep from '../helpers/sleep';
import surfaceLaptop313Glb from 'url:../../models/Surface Laptop 3 13.glb';
import surfaceLaptop313ParticlesGlb from 'url:../../models/Surface Laptop 3 13 Particles.glb';
import track from '../helpers/track';
import microfiberJpg from 'url:../../images/microfiber_4096.jpg';
import nextTick from '../helpers/next-tick';
import desktopTeamsJpg from 'url:../../images/desktop-teams.jpg';
import loginNewMp4 from 'url:../../videos/login-new.mp4';
import sizzle32Mp4 from 'url:../../videos/sizzle-3-2.mp4';

class SurfaceLaptop313Reveal extends Reveal {

    constructor (engine, environment) {
        super(engine, environment, { main: surfaceLaptop313Glb, particles: surfaceLaptop313ParticlesGlb });

        this.trackers = [];
    }

    loaded () {
        super.loaded();
    
        this.openAnim = this.scene.getAnimationGroupByName('Main');
        
        this.screenMaterial = this.scene.getMaterialByID('Screen_Switch');
        
        const fabricTexture = new Texture(microfiberJpg, this.scene);
        fabricTexture.uScale = 4;
        fabricTexture.vScale = 4;
        this.fabricMaterial = this.scene.getMaterialByID('fabric');
        this.fabricMaterial.albedoTexture = fabricTexture;
        this.fabricMaterial.metallic = 1.0;
        this.fabricMaterial.roughness = 0.81;
        //this.fabricMaterial.bumpTexture = this.fabricMaterial.albedoTexture;

        const trackpad = this.scene.getMaterialByID('trackpad fabric');
        trackpad.zOffset = 0.5;

        const glass = this.scene.getNodeByID('Display');
        const button = this.screenPlayButton = playButton(this.scene);
        button.parent = glass;
        button.rotation.x = Tools.ToRadians(180);
        button.position.y = -1;
        button.position.z = -0.07;
        button.isVisible = false;

        this.sizzleVideo = new VideoTexture('SizzleTexture', sizzle32Mp4, this.scene, false, true, null,
            { loop: false, muted: false, autoUpdateTexture: true });
        this.teamsImage = new Texture(desktopTeamsJpg, this.scene, false, false);

        this.setColor({ id: 'platinum' });
    }

    async entered () {
        this.setColor({ id: 'platinum' });

        bus.emit('reveal-headline', { text: 'The perfect <b>everyday laptop</b>', duration: 3300 });

        animation(this.camera, this.scene, 'CameraZoom', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            beta: this.camera.beta,
        }, {
            frame: 200,
            target: new Vector3(0, 60, 0),
            radius: 50,
            beta: Tools.ToRadians(70),
        } ]);

        this.loginVideo = new VideoTexture('LoginTexture', loginNewMp4, this.scene, false, true, null,
            { loop: false, muted: false, autoUpdateTexture: true });
        this.screenMaterial.albedoTexture = this.loginVideo;
        this.screenMaterial.emissiveTexture = this.loginVideo;
        this.screenMaterial.albedoColor = Color3.White();
        this.screenMaterial.emissiveColor = Color3.White();
    
        // Open the screen
        this.openAnim.stop();
        this.openAnim.start(false, 2, 2.5).play();

        await sleep(1.2 * 1000);

        // Play video and stop on last frame
        this.loginVideo.video.play().catch(err => console.error(err));

        await sleep(2000);

        await this.revealScreen();
        await this.revealCamera();
        await this.revealSpeakers();
        await this.revealFinish();
        await this.revealReset();
        await this.setupExplore();
    }

    close () {
        this.openAnim.start(false, 2, 5, 0).play();
    }

    async revealReset() {
        const anim = animation(this.camera, this.scene, 'Camera.ScreenReset', [ {
        frame: 0,
        target: this.camera.target,
        radius: this.camera.radius,
        alpha: this.camera.alpha,
        beta: this.camera.beta,
        }, {
        frame: 2 * 60,
        target: new Vector3(0, 56, -1),
        radius: 50,
        alpha: Tools.ToRadians(100),
        beta: Tools.ToRadians(68),
        } ]);

        await anim.waitAsync();
    }

    async revealScreen () {
        const anim = animation(this.camera, this.scene, 'Camera.ScreenReveal', [
        { frame: 0, target: this.camera.target, radius: this.camera.radius, alpha: this.camera.alpha,
            beta: this.camera.beta },
        { frame: 3 * 60, target: new Vector3(1.3, 67, 0), radius: 25, alpha: Tools.ToRadians(93),
            beta: Tools.ToRadians(70) },
        { frame: 7.5 * 60, target: new Vector3(1, 68, 0), radius: 25, alpha: Tools.ToRadians(87),
            beta: Tools.ToRadians(65) },
        ]);
        
        await sleep(2 * 1000);

        bus.emit('reveal-feature', { title: 'Increase productivity with a <b>13.5" Touchscreen</b>', duration: 4500 });

        bus.emit('reveal-circle', { id: 'reveal-circle-screen', duration: 5500 });
        await nextTick();
        const $circle = document.getElementById('reveal-circle-screen');
        const bezel = this.scene.getMeshByID('Display_primitive0');
        const screenTracker = track(bezel, new Vector3(-1.4, -0.12, 0), this.camera, this.scene, this.engine);
        screenTracker.onUpdate = (x, y) => {
            $circle.style.top = y + 'px';
            $circle.style.left = x + 'px';
        };
        await anim.waitAsync();
        screenTracker.destroy();
    }

    async revealCamera () {
        const anim = animation(this.camera, this.scene, 'Camera.CameraReveal', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            alpha: this.camera.alpha,
            beta: this.camera.beta,
        }, {
            frame: 1 * 60,
            target: new Vector3(-10, 70, -5),
            radius: 20,
            alpha: Tools.ToRadians(122),
            beta: Tools.ToRadians(70),
        }, {
            frame: 7.5 * 60,
            target: new Vector3(-7, 70, -5),
            alpha: Tools.ToRadians(113),
        } ]);

        await sleep(0.75 * 1000);

        this.screenMaterial.albedoTexture = this.teamsImage;
        this.screenMaterial.emissiveTexture = this.teamsImage;
        
        bus.emit('reveal-feature',
            { title: 'Advanced online meeting experience with <b>front HD camera</b>', duration: 7000 });

        bus.emit('reveal-circle', { id: 'reveal-circle-camera', duration: 6500 });
        await nextTick();
        const $circle = document.getElementById('reveal-circle-camera');
        const bezel = this.scene.getMeshByID('Display_primitive0');
        const tracker = track(bezel, new Vector3(0, -0.06, -0.06), this.camera, this.scene, this.engine);
        tracker.onUpdate = (x, y) => {
            $circle.style.top = y + 'px';
            $circle.style.left = x + 'px';
        }
        await anim.waitAsync();

        this.screenMaterial.albedoTexture = this.loginVideo;
        this.screenMaterial.emissiveTexture = this.loginVideo;

        tracker.destroy();
    }

    async revealSpeakers () {

        // Start the camera animation
        const anim = animation(this.camera, this.scene, 'Camera.SpeakersReveal', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            alpha: this.camera.alpha,
            beta: this.camera.beta,
        }, {
            frame: 1 * 60, // Move in
            target: new Vector3(0, 69, -6),
            radius: 20,
            alpha: Tools.ToRadians(100),
            beta: Tools.ToRadians(70),
        }, {
            frame: 9 * 60, // Rotate around the general top area of the screen
            target: new Vector3(0, 70, -5.5),
            radius: 25,
            alpha: Tools.ToRadians(85),
            beta: Tools.ToRadians(60),
        } ]);
    
        // Wait one second
        await sleep(1 * 1000);
        
        // Show the feature UI overlay
        bus.emit('reveal-feature', {
            title: 'Be loud and clear with enhanced dual far-field <b>Studio Mics</b>',
            details: 'Tune into radiant sound with <b>Omnisonic Speakers</b> with Dolby Audio Premium',
            duration: 7500
        });

        // Grab the screen bezel to attach circles to
        const bezel = this.scene.getMeshByID('Display_primitive0');

        // Show the circles
        bus.emit('reveal-circle', { id: 'reveal-circle-left-mic', duration: 7500 });
        bus.emit('reveal-circle', { id: 'reveal-circle-right-mic', duration: 7500 });
        await nextTick(); // Wait for Vue to actually render those so we can grab references

        // Track 3D position of the microphones and translate to 2D circles
        const $leftCircle = document.getElementById('reveal-circle-left-mic');
        const $rightCircle = document.getElementById('reveal-circle-right-mic');
        const leftTracker = track(bezel, new Vector3(-0.45, -0.06, -0.06), this.camera, this.scene, this.engine);
        const rightTracker = track(bezel, new Vector3(0.45, -0.06, -0.06), this.camera, this.scene, this.engine);
        leftTracker.onUpdate = (x, y) => {
            $leftCircle.style.top = y + 'px';
            $leftCircle.style.left = x + 'px';
        }
        rightTracker.onUpdate = (x, y) => {
            $rightCircle.style.top = y + 'px';
            $rightCircle.style.left = x + 'px';
        }

        // Wait for that camera animation to fully finish
        await anim.waitAsync();

        // Clean up
        leftTracker.destroy();
        rightTracker.destroy();
    }

    async revealFinish() {

        const anim = animation(this.camera, this.scene, 'Camera.FinishReveal', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            alpha: this.camera.alpha,
            beta: this.camera.beta,
        }, {
            frame: 1 * 60, // Move in
            target: new Vector3(-2, 47, 2),
            radius: 20,
            alpha: 1.51,
            beta: 1.054,
        }, {
            frame: 9 * 60, // Rotate around the general top area of the screen
            target: new Vector3(4, 47, 3),
            radius: 24,
            alpha: 1.59,
            beta: 1.054,
        } ]);
    
        // Wait one second
        await sleep(1 * 1000);

        bus.emit('reveal-feature', {
            title: 'Stand-out with durable <b>keyboard finishes</b> (Alcantara&reg; or Cool Metal) and <b>colors</b>',
            position: 'bottom',
            duration: 6000,
        });

        // Show the circles
        // bus.emit('reveal-circle', { id: 'reveal-circle-finish', duration: 6000 });
        // await nextTick(); // Wait for Vue to actually render those so we can grab references

        // // Track 3D position of the microphones and translate to 2D circles
        // const legend = this.scene.getMeshByID('legend');
        // const $circle = document.getElementById('reveal-circle-finish');
        // const tracker = track(legend, new Vector3(-1.4, 0, 0), this.camera, this.scene, this.engine);
        // tracker.onUpdate = (x, y) => {
        //     $circle.style.top = y + 'px';
        //     $circle.style.left = x + 'px';
        // }

        await sleep(6000);
    }

    showSizzle () {
        this.screenMaterial.albedoTexture = this.sizzleVideo;
        this.screenMaterial.emissiveTexture = this.sizzleVideo;
        this.sizzleVideo.video.play().catch(err => console.error(err));
        this.screenPlayButton.isVisible = false;
        
        this.sizzleVideo.video.addEventListener('ended', () => {
            if (this.$sizzleCircle) { this.screenPlayButton.isVisible = true; }
            this.screenMaterial.albedoTexture = this.loginVideo;
        });
    }

    async setupExplore () {
        // Leaks tons of memory, trackers need to be destroyed on clear

        const bezel = this.scene.getMeshByID('Display_primitive0');
        const trackpad = this.scene.getMeshByID('trackpad_glass');
        const legend = this.scene.getMeshByID('legend');
        
        bus.emit('reveal-circle', { id: 'reveal-circle-screen-target', duration: 1000, keep: true });
        bus.emit('reveal-circle', { id: 'reveal-circle-camera-target', duration: 1000, keep: true });
        bus.emit('reveal-circle', { id: 'reveal-circle-right-mic-target', duration: 1000, keep: true });
        bus.emit('reveal-circle', { id: 'reveal-circle-finish-target', duration: 1000, keep: true });
        bus.emit('reveal-circle', { id: 'reveal-circle-close', duration: 1000, keep: true });
        bus.emit('reveal-circle', { id: 'reveal-circle-sizzle', duration: 1000, keep: true });
        await nextTick();

        const $screenCircle = document.getElementById('reveal-circle-screen-target');
        const screenTracker = track(bezel, new Vector3(-1.4, -0.12, 0), this.camera, this.scene, this.engine);
        screenTracker.onUpdate = (x, y) => {
            $screenCircle.style.top = y + 'px';
            $screenCircle.style.left = x + 'px';
        };

        const $circle = document.getElementById('reveal-circle-camera-target');
        const cameraTracker = track(bezel, new Vector3(0, -0.06, -0.06), this.camera, this.scene, this.engine);
        cameraTracker.onUpdate = (x, y) => {
            $circle.style.top = y + 'px';
            $circle.style.left = x + 'px';
        };

        const $rightCircle = document.getElementById('reveal-circle-right-mic-target');
        const rightTracker = track(bezel, new Vector3(0.45, -0.06, -0.06), this.camera, this.scene, this.engine);
        rightTracker.onUpdate = (x, y) => {
            $rightCircle.style.top = y + 'px';
            $rightCircle.style.left = x + 'px';
        }

        const $finishCircle = document.getElementById('reveal-circle-finish-target');
        const finishTracker = track(legend, new Vector3(-1.4, 0, 0), this.camera, this.scene, this.engine);
        finishTracker.onUpdate = (x, y) => {
            $finishCircle.style.top = y + 'px';
            $finishCircle.style.left = x + 'px';
        }

        this.$sizzleCircle = document.getElementById('reveal-circle-sizzle');
        this.sizzleTracker = track(this.screenPlayButton, new Vector3(0, 0, 0), this.camera, this.scene, this.engine);
        this.sizzleTracker.onUpdate = (x, y) => {
            this.$sizzleCircle.style.top = y + 'px';
            this.$sizzleCircle.style.left = x + 'px';
        };
        this.$sizzleCircle.style.opacity = 0;
        this.screenPlayButton.isVisible = this.screenMaterial.albedoTexture !== this.sizzleVideo;

        const $closeCircle = document.getElementById('reveal-circle-close');
        this.closeTracker = track(trackpad, new Vector3(-1, -0.5, -0.1), this.camera, this.scene, this.engine);
        this.closeTracker.onUpdate = (x, y) =>  {
            $closeCircle.style.top = y + 'px';
            $closeCircle.style.left = x + 'px';
        };

        bus.on('reveal-circle-click', params => {
            let reveal;

            switch (params.id) {
                case 'reveal-circle-screen-target': reveal = this.revealScreen; break;
                case 'reveal-circle-camera-target': reveal = this.revealCamera; break;
                case 'reveal-circle-right-mic-target': reveal = this.revealSpeakers; break;
                case 'reveal-circle-finish-target': reveal = this.revealFinish; break;
                case 'reveal-circle-sizzle': this.showSizzle(); return;
                case 'reveal-circle-close': this.close(); this.clearExplore(); return;
            }

            if (reveal) {
                (async () => {
                    this.clearExplore();
                    await reveal.bind(this)();
                    await this.revealReset();
                    await this.setupExplore();
                })();
            }
        });

        bus.emit('reveal-colors',
            { colors: [
                { id: 'platinum', color: '#c0c0c0' },
                { id: 'black', color: '#212121' },
                { id: 'cobalt', color: '#354955' },
                { id: 'sandstone', color: '#D7B59E' },
            ] }
        );
        bus.on('reveal-color-picked', params => this.setColor(params.color))

        bus.emit('reveal-specs', {
            name: 'Surface <b>Laptop 3</b>',
            description: 'Get it all done with the Surface Laptop 3, which has more power than ever to keep pace with your '
                + 'ideas, running the business apps your company needs and keeping you powered all day. Surface Laptop 3 '
                + 'balances beauty and function in a thin and-light design. Tailor it to your taste with a choice of bold '
                + 'colors and material finishes.',
            specs: [
                'All-day battery life and fast charging to support',
                'USB-C and USB-A Ports',
                'Removeable SSD for data retention and first repairable Surface device',
            ],
            learnMoreURL: 'https://www.microsoft.com/en-us/p/surface-laptop-3/8VFGGH1R94TM',
        });
    }

    clearExplore () {
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-screen-target' });
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-camera-target' });
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-right-mic-target' });
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-finish-target' });

        this.sizzleTracker.destroy();
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-sizzle' });
        this.$sizzleCircle = null;

        this.closeTracker.destroy();
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-close' });

        bus.off('reveal-circle-click');
        bus.emit('reveal-colors', { colors: [] });
        bus.off('reveal-color-picked');

        bus.emit('reveal-specs', { hide: true })
    }

    setColor (color) {
        const baseTop = this.scene.getMeshByID('baseTop');
        const fabricTop = this.scene.getMeshByID('fabric_top');
        const antennaCover = this.scene.getMeshByID('antenna cover');

        const fabric = this.scene.getMaterialByID('fabric');
        const platinum = this.scene.getMaterialByID('platinum');
        const platinumPrt = this.scene.getMaterialByID('platinum_prt');
        const plastic = this.scene.getMaterialByID('Plastic_Switch');
        const logo = this.scene.getMaterialByID('logo');
        const keyboard = this.scene.getMaterialByID('keyboard fabric');
        const trackpad = this.scene.getMaterialByID('trackpad fabric');

        baseTop.visibility = 0;
        fabricTop.visibility = 0;
        antennaCover.visibility = 0;

        switch (color.id) {
            case 'cobalt':
                fabricTop.visibility = 1;
                fabric.albedoColor = Color3.FromHexString('#738598').toLinearSpace();

                platinum.roughness = 0.293;
                platinum.albedoColor = Color3.FromHexString('#03070B');
                platinumPrt.albedoColor = platinum.albedoColor;

                trackpad.metallic = 0.24;
                trackpad.roughness = 0.85;
                trackpad.albedoColor = Color3.FromHexString('#181F29').toLinearSpace();

                keyboard.metallic = 0.391;
                keyboard.roughness = 0.708;
                keyboard.albedoColor = Color3.FromHexString('#151F2A').toLinearSpace();

                logo.roughness = 0.29;
                logo.albedoColor = Color3.FromHexString('#03070B').toLinearSpace();

                plastic.roughness = 1;
                plastic.albedoColor = Color3.FromHexString('#03070B');
                break;
            case 'black':
                antennaCover.visibility = 1;
                baseTop.visibility = 1;

                platinum.roughness = 0.3;
                platinum.albedoColor = Color3.FromHexString('#040404');
                platinumPrt.albedoColor = platinum.albedoColor;

                trackpad.metallic = 1;
                trackpad.roughness = 1;
                trackpad.albedoColor = Color3.FromHexString('#090909');

                keyboard.metallic = 1;
                keyboard.roughness = 1;
                keyboard.albedoColor = Color3.FromHexString('#090909');

                plastic.roughness = 1;
                plastic.albedoColor = Color3.Black();

                logo.roughness = 0.2;
                logo.albedoColor = Color3.Black();
                break;
            case 'platinum':
                fabricTop.visibility = 1;
                fabric.albedoColor = Color3.FromHexString('#EBEBEB').toLinearSpace();

                platinum.albedoColor = Color3.FromHexString('#686868').toLinearSpace();
                platinumPrt.albedoColor = platinum.albedoColor;

                trackpad.metallic = 0.24;
                trackpad.roughness = 0.85;
                trackpad.albedoColor = Color3.FromHexString('#454545').toLinearSpace();

                keyboard.metallic = 0.391;
                keyboard.roughness = 0.708;
                keyboard.albedoColor = Color3.FromHexString('#4A4A4A').toLinearSpace();

                logo.roughness = 0.29;
                logo.albedoColor = Color3.FromHexString('#454545').toLinearSpace();

                plastic.roughness = 1;
                plastic.albedoColor = Color3.FromHexString('#616161').toLinearSpace();
                break;
            case 'sandstone':
                antennaCover.visibility = 1;
                baseTop.visibility = 1;

                platinum.roughness = 0.3;
                platinum.albedoColor = Color3.FromHexString('#FFB998').toLinearSpace();
                platinumPrt.albedoColor = platinum.albedoColor;

                trackpad.metallic = 1;
                trackpad.roughness = 0.8;
                trackpad.albedoColor = Color3.FromHexString('#EDB196').toLinearSpace();

                keyboard.metallic = 1;
                keyboard.roughness = 0.8;
                keyboard.albedoColor = Color3.FromHexString('#EDB196').toLinearSpace();

                plastic.roughness = 1;
                plastic.albedoColor = Color3.FromHexString('#3F3F3F').toLinearSpace();

                logo.roughness = 0.2;
                logo.albedoColor = Color3.FromHexString('#E0A88E').toLinearSpace();
                break;
        }
    }
}

export default SurfaceLaptop313Reveal;
