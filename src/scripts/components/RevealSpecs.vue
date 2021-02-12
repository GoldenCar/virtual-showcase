<template>
    <div class="specs" :class="{ visible }">
        <div class="features">
            <h1 v-html="name"></h1>
            <p>{{description}}</p>
            <!-- <ul>
                <li>Increase productivity with a <b>15" Touchscreen</b></li>
                <li>Advanced online meeting experience with <b>front HD camera</b></li>
                <li>Be loud and clear with enhanced dual far-field <b>Studio Mics</b> and tune into radiant sound with <b>Omnisonic Speakers</b> with Dolby Audio Premium</li>
            </ul> -->
            <h2>Tech Specs</h2>
            <ul>
                <li v-for="spec in specs" :key="spec">{{spec}}</li>
            </ul>
            <a class="learn-more" :href="learnMoreURL">Learn More &gt;</a>
        </div>
        <a class="device-details" href="#">Device Details PDF</a>
        <a @click="openAccessories" class="open-accessories" href="#">Accessories &gt;</a>
        <open-indicator @click="openCarousel" class="open-carousel">Show <b>More Devices</b></open-indicator>
    </div>
</template>

<script>
import OpenIndicator from './OpenIndicator.vue';
import bus from '../helpers/bus';

export default {

    components: { OpenIndicator, },

    data() { return {
        visible: false,
        name: '',
        description: '',
        specs: [],
        learnMoreURL: '',
    }; },

    methods: {
        animate () {

        },

        openCarousel () {
            bus.emit('carousel', 'devices');
        },

        openAccessories () {
            bus.emit('carousel', 'accessories');
        }
    }
};
</script>

<style lang="scss" scoped>

.specs {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &.visible {

        .features,.tech-specs,.open-accessories,.device-details {
            transform: translateX(0);
            opacity: 1;
        }

        .open-carousel {
            transform: translateX(-50%);
        }
    }
}

ul {
    list-style: none;
    padding: 0;
}

.features {
    position: absolute;
    top: 54px;
    left: 60px;
    width: 360px;
    font-size: 14px;
    color: #2b2b2b;
    transition: all 0.5s;
    transform: translateX(-64px);
    opacity: 0;

    h1 {
        margin: 0 0 16px;
        font-size: 32px;
        font-weight: 300;
    }

    h2 {
        font-size: 16px;
        font-weight: 600;
    }

    ul {
        list-style-type: '- ';
        list-style-position: outside;
        padding-left: 8px;
    }

    li {
        margin: 12px 0;
    }

    b {
        white-space: nowrap;
    }
}

.tech-specs {
    position: absolute;
    bottom: 54px;
    right: 30px;
    max-width: 160px;
    transition: all 0.5s;
    transform: translateX(64px);
    opacity: 0;

    h2 {
        font-size: 16px;
        font-weight: 600;
    }

    li {
        margin: 12px 0;
        font-size: 10px;
        font-weight: 300;
    }
}

.learn-more {
    color: black;
    text-decoration: none;
    pointer-events: auto;
    font-weight: 600;
}

.open-accessories {
    position: absolute;
    bottom: 42px;
    right: 60px;
    color: black;
    text-decoration: none;
    pointer-events: auto;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.5s;
    transform: translateX(-64px);
    opacity: 0;
}

.device-details {
    position: absolute;
    bottom: 42px;
    left: 60px;
    color: black;
    text-decoration: none;
    pointer-events: auto;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.5s;
    transform: translateX(-64px);
    opacity: 0;
}

.open-carousel {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(64px);
}
    
</style>