<template>
  <h2 :class="{ visible }" v-html="text"></h2>
</template>

<script>
import sleep from '../helpers/sleep';

export default {
  data() { return {
    text: String,
    visible: false,
  }; },

  methods: {

    async animate(duration) {
      this.visible = true;
      await sleep(duration);
      this.visible = false;
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: normal;
  text-align: center;
  transform: translateY(-48px);
  opacity: 0;
  transition: all 0.5s;
}

h2.visible {
  transform: translateY(0);
  opacity: 1;
}
</style>