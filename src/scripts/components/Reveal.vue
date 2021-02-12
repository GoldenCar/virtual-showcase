<template>
    <div id="reveal" class="reveal full-screen-shift" ref="reveal">
        <reveal-headline ref="headline"></reveal-headline>
        <reveal-feature ref="feature"></reveal-feature>

        <reveal-specs ref="specs"></reveal-specs>

        <reveal-color ref="color"></reveal-color>

        <reveal-circle v-for="id in circles" :key="id" :id="id" :ref="id"></reveal-circle>
    </div>
</template>

<script>
import { nextTick } from 'vue';

import Carousel from './Carousel.vue';
import RevealCircle from './RevealCircle.vue';
import RevealColor from './RevealColor.vue';
import RevealFeature from './RevealFeature.vue';
import RevealHeadline from './RevealHeadline.vue';
import RevealSpecs from './RevealSpecs.vue';
import RevealScrolldown from './RevealScrolldown.vue';

import bus from '../helpers/bus';

export default {

    components: { Carousel, RevealCircle, RevealColor, RevealFeature, RevealHeadline, RevealSpecs, RevealScrolldown },

    data: () => ({
        circles: [],
    }),

    methods: {

        revealHeadline(params) {
        this.$refs.headline.text = params.text;
        this.$refs.headline.animate(params.duration);
        },

        revealFeature(params) {
        this.$refs.feature.title = params.title;
        this.$refs.feature.details = params.details;
        this.$refs.feature.position = params.position;
        this.$refs.feature.animate(params.duration, params.delay);
        },

        revealCircle(params) {
        this.circles.push(params.id);

        nextTick(() => {
            this.$refs[params.id].animate(params.duration).then(() => {
            if (!params.keep) {
                this.revealCircleRemove(params);
            }
            });
        });
        },

        revealCircleRemove(params) {
        const index = this.circles.indexOf(params.id);
        if (index > -1) {
            this.circles.splice(index, 1);
        }
        },
        
        revealSpecs(params) {
        this.$refs.specs.visible = !params.hide;
        this.$refs.specs.name = params.name;
        this.$refs.specs.description = params.description;
        this.$refs.specs.specs = params.specs;
        this.$refs.specs.learnMoreURL = params.learnMoreURL;
        },
        
        revealScrolldown(params) {
        this.$refs.scrolldown.animate();
        },
    },

    mounted() {
        bus.on('reveal-headline', params => this.revealHeadline(params));
        bus.on('reveal-feature', params => this.revealFeature(params));
        bus.on('reveal-circle', params => this.revealCircle(params));
        bus.on('reveal-circle-remove', params => this.revealCircleRemove(params));
        bus.on('reveal-specs', params => this.revealSpecs(params));
        bus.on('reveal-scrolldown', params => this.revealScrolldown(params));
        this.circles = [];
    }
};
</script>

<style lang="scss" scoped>
.reveal {
    display: flex;
    flex-direction: column;
    pointer-events: none;
    z-index: 1; // Fixes some weird Safari bugs with child transitions
}
</style>