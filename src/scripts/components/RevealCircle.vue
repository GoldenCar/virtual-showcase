<template>
    <div :id="id" class="circle" :class="{ visible, paused }" ref="outer">
        <div @click="click" class="circle-inner" ref="inner"></div>
    </div>
</template>

<script>
import bus from '../helpers/bus';
import sleep from '../helpers/sleep';

export default {
    props: {
        id: String,
    },

    data() { return {
        visible: false, // Visible for testing
        paused: false,
    }; },

    methods: {
        async animate(duration, number) {
            this.visible = true;
            this.paused = false;
            await sleep(duration);
            this.paused = true;
        },

        click() {
            bus.emit('reveal-circle-click', { id: this.id });
        }
    }
};
</script>

<style lang="scss" scoped>

.circle {
    position: absolute;
    display: none;
    z-index: -1;

    &.visible {
        display: block;
    }

    &.paused {

        .circle-inner {
            pointer-events: auto;
            cursor: pointer;

            &:hover {
                transform: translate(-50%, -50%) scale(1.1);
            }

            &:before,&:after {
                animation-play-state: paused;
            }
        }
    }

    .circle-inner {
        position: absolute;
        transform: translateX(-50%) translateY(-50%);
        width: 36px;
        height: 36px;
        transition: transform 1s;
        
        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 108px;
            height: 108px;
            transform: translate(-50%, -50%);
            box-sizing: border-box;
            border: 1px solid rgba(white, 0.4);
            border-radius: 54px;
            background-color: rgba(white, 0.3);
            animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            pointer-events: none;
        }
            
        &:after {
            content: '';
            position: absolute;
            left: 50%; 
            top: 50%;
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(white, 0.25);
            border: 1px solid rgba(white, 0.5);
            border-radius: 18px;
            box-shadow: 0 0 8px rgba(white,.3);
            transform: translate(-50%, -50%);
            animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
        }
    }
}


@keyframes pulse-ring {
    0% {
        transform: translate(-50%, -50%) scale(.33);
    }
    80%, 100% {
        opacity: 0;
    }
}

@keyframes pulse-dot {
    0% {
        transform: translate(-50%, -50%) scale(.8);
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        transform: translate(-50%, -50%) scale(.8);
    }
}
</style>
