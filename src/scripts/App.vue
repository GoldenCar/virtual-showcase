<template>
  <div class="app">
    <app-header class="header"></app-header>
    <canvas id="render" class="full-screen-shift" touch-action="none"></canvas>

    <app-form></app-form>

    <reveal class="reveal"></reveal>

    <carousel id="devices" :devices="devices"></carousel>
    <carousel
      id="accessories"
      direction="vertical"
      :devices="accessories"
    ></carousel>

    <app-loading></app-loading>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppLoading from './components/AppLoading.vue';
import AppForm from './components/AppForm.vue';
import Reveal from './components/Reveal.vue';
import Carousel from './components/Carousel.vue';

import experience from './experience';

import surfaceBook3Png from 'url:/src/images/surface-book-3.png';
import surfaceGo2Png from 'url:/src/images/surface-go-2.png';
import surfaceProXPng from 'url:/src/images/surface-pro-x.png';
// import surfacePro7Png from 'url:../../images/surface-pro-7.png';
import surfaceLaptop3Png from 'url:/src/images/surface-laptop-3.png';
// import surfaceStudio2Png from 'url:../../images/surface-studio-2.png';
// import surfaceHub2Png from 'url:../../images/surface-hub-2.png';
import surfaceDuoPng from 'url:/src/images/surface-duo.png';
// import surfaceLaptopGoPng from 'url:../images/surface-laptop-go.png';

import surfaceArcMousePng from 'url:/src/images/surface-arc-mouse.png';
import surfaceDockPng from 'url:/src/images/surface-dock.png';
import surfaceEarbudsPng from 'url:/src/images/surface-earbuds.png';
import surfaceHeadphones2Png from 'url:/src/images/surface-headphones-2.png';
import surfaceMobileMousePng from 'url:/src/images/surface-mobile-mouse.png';
import surfacePenPng from 'url:/src/images/surface-pen.png';

const devices = {
  'surface-book-3': { name: 'Book 3', img: surfaceBook3Png },
  'surface-go-2': { name: 'Go 2', img: surfaceGo2Png },
  'surface-pro-x': { name: 'Pro X', img: surfaceProXPng },
  // 'surface-pro-7': { name: 'Surface Pro 7', img: surfacePro7Png },
  'surface-laptop-3': { name: 'Laptop 3', img: surfaceLaptop3Png },
  // 'surface-studio-2': { name: 'Surface Studio 2', img: surfaceStudio2Png },
  // 'surface-hub-2': { name: 'Surface Hub 2', img: surfaceHub2Png },
  'surface-duo': { name: 'Duo', img: surfaceDuoPng }
  // 'surface-laptop-go': { name: 'Surface Laptop Go', img: surfaceLaptopGoPng },
};

const accessories = {
  'surface-arc-mouse': { name: 'Arc Mouse', img: surfaceArcMousePng },
  'surface-dock': { name: 'Dock', img: surfaceDockPng },
  'surface-earbuds': { name: 'Earbuds', img: surfaceEarbudsPng },
  'surface-headphones-2': { name: 'Headphones 2', img: surfaceHeadphones2Png },
  'surface-mobile-mouse': { name: 'Mobile Mouse', img: surfaceMobileMousePng },
  'surface-pen': { name: 'Pen', img: surfacePenPng }
};

export default {
  components: { AppHeader, AppLoading, AppForm, Reveal, Carousel },

  data: () => ({ devices, accessories }),

  mounted() {
    experience();
  }
};
</script>

<style lang="scss" scoped>
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px; // Defined in AppHeader as well, but repeating for reference
  background: white;
  z-index: 10;
}

.reveal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.carousel {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 100%;
}
</style>
