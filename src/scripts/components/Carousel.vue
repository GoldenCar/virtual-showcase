<template>
    <div class="carousel" :class="[ { visible }, direction ]">
        <!-- <h1 v-if="direction == 'horizontal'">Other <b>Surface Devices</b></h1> -->
        <open-indicator v-if="direction == 'horizontal'" @click="closeCarousel" class="close-indicator" theme="dark" direction="up">
            Back to <b>Surface Laptop 3</b>
        </open-indicator>
        <button v-if="direction == 'vertical'" class="close-button" @click="closeCarousel"><img :src="closeSvg" alt="Close"></button>
        <swiper
            @swiper="onSwiper"
            :direction="direction"
            :slides-per-view="3"
            :loop="true"
            :looped-slides="3"
            :centered-slides="true"
            :mousewheel="true"
            :slide-to-clicked-slide="true"
            :pagination="{ clickable: true, el: '.swiper-navigation' }"
        >
            <swiper-slide v-for="device in devices" :key="device.name" v-slot="{ isActive }">
                <carousel-card :name="device.name" :image="device.img" :direction="direction" :active="isActive">
                </carousel-card>
            </swiper-slide>
            <div class="carousel-navigation">
                <button @click="swiper.slidePrev()" class="carousel-control carousel-control-prev"></button>
                <div class="swiper-navigation"></div>
                <button @click="swiper.slideNext()" class="carousel-control carousel-control-next"></button>
            </div>
        </swiper>
    </div>
</template>


<script>
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import CarouselCard from './CarouselCard.vue';
import OpenIndicator from './OpenIndicator.vue';

import bus from '../helpers/bus'
import closeSvg from 'url:../../images/close.svg';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([ Pagination ]);

export default {
    components: { CarouselCard, OpenIndicator, Swiper, SwiperSlide },

    props: {
        id: String,
        direction: { type: String, default: 'horizontal' },
        devices: Object,
    },

    data () { return {
        visible: false,
        closeSvg,
    } },

    mounted () {
        bus.on('carousel', (id) => {

            // Only open if id matches and it's not visible, otherwise close to provide toggle function or to make room
            // for other carousel
            if (this.id == id && !this.visible) {
                this.showCarousel();
            } else {
                this.closeCarousel();
            }
        });
    },

    methods: {

        onSwiper (swiper) {
            this.swiper = swiper;
        },

        showCarousel() {
            this.visible = true;
            document.getElementById('render').classList.add('full-screen-shift-' + this.direction);
            document.getElementById('reveal').classList.add('full-screen-shift-' + this.direction);
        },

        closeCarousel() {
            this.visible = false;
            document.getElementById('render').classList.remove('full-screen-shift-' + this.direction);
            document.getElementById('reveal').classList.remove('full-screen-shift-' + this.direction);
        }
    }
}



</script>

<style lang="scss" scoped>

.carousel {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#e0e0e0, #a0a0a0);
    pointer-events: auto;
    transition: 0.5s top;
    z-index: 1;
 
    &.visible {
        top: 0;
    }

    &.vertical {
        top: 0;
        right: 0;
        left: auto;
        width: 320px;
        margin-right: -320px;
        transition: 0.5s margin;

        &.visible {
            margin-right: 0;
        }
    }
}

h1 {
    position: absolute;
    top: 20px;
    left: 64px;
    color: white;
    font-weight: 300;
}

.close-indicator {
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
}

.close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    z-index: 10;
    outline: none;
    border: none;
    background: none;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
    }
}

.swiper-container {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 680px;
    transform: translateY(-50%);
}

.vertical .swiper-container {
    top: 0;
    width: 320px;
    height: 100%;
    transform: none;
}

.carousel-navigation {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;

    .carousel-control {
        margin: 0 4px;
        padding: 0 20px 2px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 600;
        background: none;
        border: none;
        outline: none;
        color: black;
    }

    .carousel-control::after {
        content: '';
        position: absolute;
        top: 50%;
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: translateY(-50%) rotate(-45deg);
    }

    .carousel-control-prev::after {
        left: 0;
        transform: translateY(-50%) rotate(135deg);
    }

    .carousel-control-next::after {
        right: 0;
        transform: translateY(-50%) rotate(-45deg);
    }
}

.vertical .carousel-navigation {
    display: none;
}
</style>

<style lang="scss">

.carousel-navigation {

    .swiper-pagination-bullet {
        margin: 0 5px;
        width: 10px;
        height: 10px;
        background: none;
        border: 2px solid black;
        border-radius: 0;
        opacity: 1;
        transition-property: width, height, margin;
        transition-duration: 0.5s;
    }

    .swiper-pagination-bullet-active {
        margin: 5px;
        width: 40px;
        height: 0;
        background: none;
    }
}
</style>