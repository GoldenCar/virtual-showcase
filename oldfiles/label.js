'use strict';

AFRAME.registerComponent('label', {
    schema: {
        labelOffset: { type: 'vec3' },
    },
    init: function () {
        this.text = this.el.children[0];

        this.material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
        this.points = [];
        this.points.push(new THREE.Vector3(0, 0, 0));
        this.points.push(new THREE.Vector3(0, 0, 0));
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        var line = new THREE.Line(this.geometry, this.material);
        this.el.sceneEl.object3D.add(line);

        this.animate();
        document.getElementById('animate').addEventListener('click', this.animate.bind(this));
    },
    animate: function () {
        this.text.style.opacity = 0;
        this.material.opacity = 0;
        this.material.transparent = true;

        AFRAME.ANIME({
            targets: [ this.text.style, this.material ],
            opacity: 1,
            duration: 4000,
            easing: 'easeOutQuad',
            delay: 3500,
        });
    },
    update: function () {
        const lo = this.data.labelOffset;
        this.points[1].set(lo.x, lo.y, lo.z);
    },
    tick: function () {
        this.el.sceneEl.camera.updateMatrixWorld();
        this.el.sceneEl.camera.updateProjectionMatrix();

        // For some reason the vector is 2x longer than it should be
        const position = this.el.object3D.localToWorld(this.el.object3D.position.clone());
        const startPosition = position.clone().multiplyScalar(0.5);
        this.points[0] = startPosition;

        this.geometry.setFromPoints(this.points);
        this.geometry.computeBoundingSphere();

        const vector = this.points[1].clone().project(this.el.sceneEl.camera);

        this.text.style.left = Math.round((vector.x + 1 ) * window.innerWidth  / 2 ) + 'px';
        this.text.style.top = Math.round((-vector.y + 1 ) * window.innerHeight / 2 ) + 'px';
    }
});
