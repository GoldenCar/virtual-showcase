'use strict';

AFRAME.registerComponent('clicky-play-glow', {

    schema: {
        glowNode: { type: 'string' },
        clickSrc: { type: 'string' },
        videoSrc: { type: 'string' }
    },

    init: function () {
        this.$video = document.querySelector(this.data.videoSrc);
        this.$click = document.querySelector(this.data.clickSrc);

        if (this.el.getObject3D('mesh')) {
            this.loaded();
        } else {
            this.el.addEventListener('model-loaded', this.loaded.bind(this));
        }
    },


    loaded: function () {
        this.node = this.el.object3D.getObjectByName(this.data.glowNode);
        

        this.$click.addEventListener('mouseenter', (e) => {
            
        });

        this.$click.addEventListener('click', this.onClick.bind(this));
    },

    onClick: function (e) {
        console.log(e);
        this.$video.play();
    },

    searchId: function (node, id) {
        let found = node.getObjectById(id);

        console.log(node);

        if (!found && node.children && node.children.length) {
            for (const child of node.children) {
                found = this.searchId(child);
                if (found) { return found; }
            }
        }

        return found;
    }
});
