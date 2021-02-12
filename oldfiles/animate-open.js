'use strict';

AFRAME.registerComponent('animate-open', {
    init: function () {
        this.el.addEventListener('model-loaded', this.loaded.bind(this));

        document.getElementById('animate').addEventListener('click', this.loaded.bind(this));
    },

    loaded: function () {
        //this.el.object3D.visible = false;

        const display = this.el.object3D.getObjectByName('Display');
        const base = this.el.object3D.getObjectByName('Base');

        display.position.z += 100;
        base.position.y -= 70;
        this.el.object3D.rotation.y = 5;

        this.originalOpacities = {};
        this.el.object3D.traverse(node => {
            if (node.material) {
                this.originalOpacities[node.id] = node.material.opacity;
            }
        });

        this.updateOpacity(0);

        let opacity = { val: 0 };

        AFRAME.ANIME({
            targets: opacity,
            val: 2000,
            duration: 1000,
            easing: 'linear',
            update: () => {
                this.updateOpacity(opacity.val / 1000);
            },
        });

        AFRAME.ANIME({
            targets: display.position,
            z: 0,
            easing: 'easeInOutQuad',
            duration: 4300,
        });

        AFRAME.ANIME({
            targets: base.position,
            y: 0,
            easing: 'easeOutQuad',
            duration: 4000,
        });

        AFRAME.ANIME({
            targets: this.el.object3D.rotation,
            y: 0,
            easing: 'easeOutCubic',
            duration: 4800,
        });
    },

    updateOpacity: function (opacity) {
        this.el.object3D.traverse(node => {
            if (node.material) {
                node.material.opacity = opacity * this.originalOpacities[node.id];
                //node.material.transparent = node.material.opacity < 1.0;
                node.material.needsUpdate = true;
            }
        });
    }
});