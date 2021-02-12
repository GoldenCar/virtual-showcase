<template>
    <div class="background">
        <div
            v-for="(gradient, color) in colors"
            :key="color"
            :style="{ background: gradient }"
            :class="{ active: active == color }">
        </div>
    </div>
</template>

<script>
import bus from '../helpers/bus';

export default {
    data () { return {
        active: 'gray',
        colors: {
        red: 'linear-gradient(#f2a383, #F16731)',
        green: 'linear-gradient(#c7e0a6, #8fc649)',
        blue: 'linear-gradient(#c1ebfe, #1EAFEE)',
        yellow: 'linear-gradient(#fff0cc, #fec131)',
        gray: 'linear-gradient(#e0e0e0, #a0a0a0)',
        }
    }; },

    mounted () {
        bus.on('background', color => this.active = color);
    }
}
</script>

<style scoped>
.background div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    transition: opacity 3s;
    opacity: 0;
}

.background div.active {
    opacity: 1;
}
</style>