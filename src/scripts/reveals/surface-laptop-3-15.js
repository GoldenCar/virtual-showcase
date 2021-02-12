import { Animation, AnimationGroup, Color3, EasingFunction, HemisphericLight, MeshExploder, QuadraticEase, Tools, Vector3, VideoTexture } from '@babylonjs/core';
import Reveal from './reveal';
import animation from '../helpers/animation';
import bus from '../helpers/bus';
import playButton from '../nodes/play-button';
import sleep from '../helpers/sleep';
import track from '../helpers/track';

class SurfaceLaptop315Reveal extends Reveal {

    constructor (engine, scene, camera) {
        super(engine, scene, camera, { main: 'Surface Laptop 3 15.glb', entrance: 'Surface Laptop 3 15 Particles.glb' });

        this.trackers = [];
    }

    loaded () {
        super.loaded();

        this.screenCloseAnimation = this.scene.getAnimationGroupByName('Screen.Close');
        this.screenCloseAnimation.play().pause().goToFrame(8);

        this.screenMaterial = this.scene.getMaterialByID('Glass.001');
        this.screenMaterial.roughness = 0.15;

        const glass = this.scene.getNodeByID('glass new.001');
        const button = this.screenPlayButton = playButton(this.scene);
        button.parent = glass;
        button.rotation.x = Tools.ToRadians(180);
        button.position.y = 1.2;
        button.isVisible = false;

        this.sizzleVideo = new VideoTexture('SizzleTexture', 'videos/sizzle-3-2.mp4', this.scene, true, true, null, { loop: false, muted: false, autoUpdateTexture: true });
    }

    async entered () {
        // Show headline
        bus.emit('reveal-headline', { text: 'The perfect <b>everyday laptop</b>', duration: 3300 });

        // Set up video
        this.loginVideo = new VideoTexture('LoginTexture', 'videos/login-new.mp4', this.scene, true, true, null, { loop: false, muted: true, autoUpdateTexture: true });
        this.screenMaterial.albedoTexture = this.loginVideo;
        this.screenMaterial.emissiveTexture = this.loginVideo;
        this.screenMaterial.albedoColor = Color3.White();
        this.screenMaterial.emissiveColor = Color3.White();

        // Open the screen
        await sleep(0.5 * 1000);
        this.screenCloseAnimation.stop();
        this.screenCloseAnimation.start(false, 4, 8, 0).play();

        await sleep(0.5 * 1000);

        // Play video and stop on last frame
        this.loginVideo.video.play().catch(err => console.error(err));

        await sleep(0.5 * 1000);

        await this.revealScreen();
        await this.revealCamera();
        await this.revealSpeakers();
        await this.revealReset();

        this.setupExplore();
    }

    close () {
        this.screenCloseAnimation.start(false, 4, 0, 8).play();
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
            target: new Vector3(0, 0, -0.5),
            radius: 3.2,
            alpha: Tools.ToRadians(100),
            beta: Tools.ToRadians(68),
        } ]);

        await anim.waitAsync();
    }

    async revealScreen () {
        const anim = animation(this.camera, this.scene, 'Camera.ScreenReveal', [
            { frame: 0, target: this.camera.target, radius: this.camera.radius, alpha: this.camera.alpha },
            { frame: 3 * 60, target: new Vector3(0.11, 0.46, -0.5), radius: 1.8, alpha: Tools.ToRadians(85) },
            { frame: 7.5 * 60, target: new Vector3(0.015, 0.445, -0.5), radius: 1.9, alpha: Tools.ToRadians(90) },
        ]);
        
        await sleep(2 * 1000);

        bus.emit('reveal-feature', { title: 'Increase productivity with a <b>15" Touchscreen</b>', duration: 5500 });

        bus.emit('reveal-circle', { id: 'reveal-circle-screen', duration: 5500 });
        const $circle = document.getElementById('reveal-circle-screen');
        const bezel = this.scene.getMeshByID('Bezel');
        const screenTracker = track(bezel, new Vector3(-1.7, 2.35, 0), this.camera, this.scene, this.engine);
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
            target: new Vector3(-0.13, 0.72, -0.74),
            radius: 1.253,
            alpha: Tools.ToRadians(122),
            beta: Tools.ToRadians(64),
        }, {
            frame: 7.5 * 60,
            target: new Vector3(-0.11, 0.72, -0.73),
            alpha: Tools.ToRadians(113),
        } ]);

        await sleep(0.75 * 1000);
        
        bus.emit('reveal-feature', { title: 'Advanced online meeting experience with <b>front HD camera</b>', duration: 7000 });

        bus.emit('reveal-circle', { id: 'reveal-circle-camera', duration: 7000 });
        const $circle = document.getElementById('reveal-circle-camera');
        const bezel = this.scene.getMeshByID('Bezel');
        const tracker = track(bezel, new Vector3(0, 2.35, 0), this.camera, this.scene, this.engine);
        tracker.onUpdate = (x, y) => {
            $circle.style.top = y + 'px';
            $circle.style.left = x + 'px';
        }
        await anim.waitAsync();
        tracker.destroy();
    }

    async revealSpeakers () {
        const anim = animation(this.camera, this.scene, 'Camera.SpeakersReveal', [ {
            frame: 0,
            target: this.camera.target,
            radius: this.camera.radius,
            alpha: this.camera.alpha,
            beta: this.camera.beta,
        }, {
            frame: 1 * 60,
            target: new Vector3(-0.08, 0.63, -0.63),
            radius: 1.536,
            alpha: Tools.ToRadians(100),
            beta: Tools.ToRadians(58),
        }, {
            frame: 9 * 60,
            target: new Vector3(0, 0.48, -0.54),
            radius: 1.993,
            alpha: Tools.ToRadians(72),
            beta: Tools.ToRadians(73),
        } ]);
        
        await sleep(1 * 1000);
        
        bus.emit('reveal-feature', {
            title: 'Be loud and clear with enhanced dual far-field <b>Studio Mics</b>',
            details: 'Tune into radiant sound with <b>Omnisonic Speakers</b> with Dolby Audio Premium',
            duration: 8000
        });

        const bezel = this.scene.getMeshByID('Bezel');

        bus.emit('reveal-circle', { id: 'reveal-circle-left-mic', duration: 8000 });
        bus.emit('reveal-circle', { id: 'reveal-circle-right-mic', duration: 8000 });
        const $leftCircle = document.getElementById('reveal-circle-left-mic');
        const $rightCircle = document.getElementById('reveal-circle-right-mic');
        const leftTracker = track(bezel, new Vector3(-0.45, 2.35, 0), this.camera, this.scene, this.engine);
        const rightTracker = track(bezel, new Vector3(0.45, 2.35, 0), this.camera, this.scene, this.engine);
        leftTracker.onUpdate = (x, y) => {
            $leftCircle.style.top = y + 'px';
            $leftCircle.style.left = x + 'px';
        }
        rightTracker.onUpdate = (x, y) => {
            $rightCircle.style.top = y + 'px';
            $rightCircle.style.left = x + 'px';
        }

        await anim.waitAsync();

        leftTracker.destroy();
        rightTracker.destroy();
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

    setupExplore () {
        // Leaks tons of memory, trackers need to be destroyed on clear

        const bezel = this.scene.getMeshByID('Bezel');
        const trackpad = this.scene.getMeshByID('trackpad');
        
        bus.emit('reveal-circle', { id: 'reveal-circle-screen-target', duration: 1000, keep: true });
        const $screenCircle = document.getElementById('reveal-circle-screen-target');
        const screenTracker = track(bezel, new Vector3(-1.7, 2.35, 0), this.camera, this.scene, this.engine);
        screenTracker.onUpdate = (x, y) => {
            $screenCircle.style.top = y + 'px';
            $screenCircle.style.left = x + 'px';
        };

        bus.emit('reveal-circle', { id: 'reveal-circle-camera-target', duration: 1000, keep: true });
        const $circle = document.getElementById('reveal-circle-camera-target');
        const cameraTracker = track(bezel, new Vector3(0, 2.35, 0), this.camera, this.scene, this.engine);
        cameraTracker.onUpdate = (x, y) => {
            $circle.style.top = y + 'px';
            $circle.style.left = x + 'px';
        };

        bus.emit('reveal-circle', { id: 'reveal-circle-right-mic-target', duration: 1000, keep: true });
        const $rightCircle = document.getElementById('reveal-circle-right-mic-target');
        const rightTracker = track(bezel, new Vector3(0.45, 2.35, 0), this.camera, this.scene, this.engine);
        rightTracker.onUpdate = (x, y) => {
            $rightCircle.style.top = y + 'px';
            $rightCircle.style.left = x + 'px';
        }

        bus.emit('reveal-circle', { id: 'reveal-circle-sizzle', duration: 1000, keep: true });
        this.$sizzleCircle = document.getElementById('reveal-circle-sizzle');
        this.sizzleTracker = track(this.screenPlayButton, new Vector3(0, 0, 0), this.camera, this.scene, this.engine);
        this.sizzleTracker.onUpdate = (x, y) => {
            this.$sizzleCircle.style.top = y + 'px';
            this.$sizzleCircle.style.left = x + 'px';
        };
        this.$sizzleCircle.style.opacity = 0;
        this.screenPlayButton.isVisible = this.screenMaterial.albedoTexture !== this.sizzleVideo;

        bus.emit('reveal-circle', { id: 'reveal-circle-close', duration: 1000, keep: true });
        const $closeCircle = document.getElementById('reveal-circle-close');
        this.closeTracker = track(trackpad, new Vector3(-0.5, 0, -0.2), this.camera, this.scene, this.engine);
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

        bus.emit('reveal-colors', { colors: [
            { id: 'platinum', color: '#c0c0c0' },
            { id: 'matte-black', color: '#212121' },
        ] });
        bus.on('reveal-color-picked', params => this.setColor(params.color))

        bus.emit('reveal-specs', {
            name: 'Surface <b>Laptop 3</b> 15"',
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

        this.sizzleTracker.destroy();
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-sizzle' });
        this.$sizzleCircle = null;

        this.closeTracker.destroy();
        bus.emit('reveal-circle-remove', { id: 'reveal-circle-close' });

        bus.$off('reveal-circle-click');
        bus.emit('reveal-colors', { colors: [] });
        bus.$off('reveal-color-picked');

        bus.emit('reveal-specs', { hide: true })
    }

    setColor (color) {
        const aluminumTop = this.scene.getMaterialByID('Aluminum Top');
        const anodized1 = this.scene.getMaterialByID('Anodized_Switch.001');
        const anodized2 = this.scene.getMaterialByID('Anodized_Switch.002');
        const keyboard = this.scene.getMaterialByID('keyboard platinum.001');
        const logo = this.scene.getMaterialByID('Logo_Switch.001')
        const foot = this.scene.getMaterialByID('Plastic_foot.001');
        const trackpad = this.scene.getMaterialByID('trackpad.001');

        switch (color.id) {
            case 'platinum':
                aluminumTop.albedoColor = Color3.FromHexString('#484848');
                anodized1.albedoColor = Color3.FromHexString('#4B4B4B');
                anodized2.albedoColor = Color3.FromHexString('#030303');
                keyboard.albedoColor = Color3.FromHexString('#141414');
                logo.albedoColor = Color3.FromHexString('#7F7F7F');
                foot.albedoColor = Color3.FromHexString('#616161');
                trackpad.albedoColor = Color3.FromHexString('#2A2A2A');
                break;
            case 'matte-black':
                aluminumTop.albedoColor = Color3.FromHexString('#0d0d0d');
                anodized1.albedoColor = Color3.FromHexString('#0e0e0e');
                anodized2.albedoColor = Color3.Black();
                keyboard.albedoColor = Color3.FromHexString('#090909');
                logo.albedoColor = Color3.Black();
                foot.albedoColor = Color3.Black();
                trackpad.albedoColor = Color3.FromHexString('#090909');
                break;
        }
    }
};

export default SurfaceLaptop315Reveal;
