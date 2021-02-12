'use strict';

AFRAME.registerComponent('video-on-node', {

    schema: {
        name: { type: 'string' },
        src: { type: 'string' },
    },

    init: function () {
        this.el.addEventListener('model-loaded', this.loaded.bind(this));
    },

    loaded: function () {
        this.$video = document.querySelector(this.data.src);
        this.node = this.el.object3D.getObjectByName(this.data.name);

        var size = 2 * 2;
var data = new Uint8Array( 3 * size );


for ( var i = 0; i < size; i ++ ) {

	var stride = i * 3;

	data[ stride ] = 0;
	data[ stride + 1 ] = 0;
	data[ stride + 2 ] = 0;

}

// used the buffer to create a DataTexture

var texture = new THREE.DataTexture( data, 2, 2, THREE.RGBFormat );

// this.node.material.map = texture;
// this.node.material.emissiveMap = texture;

        this.$video.addEventListener('play', this.onPlay.bind(this));
    },

    onPlay: function () {
        if (this.replaced) { return; }
        this.replaced = true;

        const tex = new THREE.VideoTexture(this.$video);
        this.node.material.map = tex;
        this.node.material.emissiveMap = tex;
    },

    searchId: function (node, id) {
        let found = node.getObjectById(id);

        if (!found && node.children && node.children.length) {
            for (const child of node.children) {
                found = this.searchId(child);
                if (found) { return found; }
            }
        }

        return found;
    }
})