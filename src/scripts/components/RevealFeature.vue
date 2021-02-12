<template>
  <div class="reveal-feature" :class="[ { visible }, position ]">
    <h3 v-html="Splitting.html({ content: title, by: 'chars' })"></h3>
    <hr>
    <p v-html="Splitting.html({ content: details || '', by: 'chars' })"></p>
  </div>
</template>

<script>
import Splitting from 'splitting';

import sleep from '../helpers/sleep';

import 'splitting/dist/splitting.css';
import nextTick from '../helpers/next-tick';

export default {

  data() { return {
    title: '',
    details: '',
    visible: false,
    position: 'top',
    Splitting,
  }; },

  methods: {
    async animate(duration, delay = 0) {
      await sleep(delay);
      await nextTick();
      this.visible = true;
      await sleep(duration);
      this.visible = false;
      await sleep(500);
    }
  },
};
</script>

<style lang="scss" scoped>
.reveal-feature {
  position: absolute;
  top: 36px;
  left: 0;
}

.reveal-feature.bottom {
  top: auto;
  bottom: 36px;
}

h3 {
  margin: 18px 0;
  padding-left: 96px;
  font-size: 32px;
  font-weight: normal;
}

p {
  padding-left: 96px;
  font-size: 18px;
}
</style>

<style lang="scss">
.reveal-feature {

  hr {
    transform: translateX(-64px);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 0.5s;
  }

  h3,p {  
    .char {
      opacity: 0;
      transition-property: opacity;
      transition-duration: 30ms;
      transition-delay: calc(10ms * var(--char-index));
    }
  }
}

.reveal-feature.visible {

  hr {
    transform: translateX(0);
    opacity: 1;
  }

  h3,p {
    .char {
      opacity: 1;
      transition-property: opacity;
      transition-duration: 60ms;
      transition-delay: calc(30ms * var(--char-index));
    }
  }
}
</style>