<template>
<div id="section06" class="demo" :class="{ visible }">
  <a @click="click"><span></span>Scroll</a>
  </div>
</template>

<script>
import bus from '../helpers/bus';

export default {
  data() { return {
    visible: false,
  }; },

  methods: {

    async animate() {
      this.visible = true;
    },

    click () {
      console.log('carousel');
      bus.emit('carousel');
    }
  }
};

</script>

<style scoped>

a {
  position: absolute;
  bottom: 48px;
  left: 50%;
  pointer-events: auto;
  transform: translateX(-50%);
}

</style>