<template>
  <div class="color-picker">
    <button
      v-for="(color, index) in colors"
      :key="color.id"
      :style="{ background: color.color }"
      :data-selected="selected == index"
      @click="onClick(index)"
    ></button>
  </div>
</template>

<script>
import bus from '../helpers/bus';

export default {

  data() { return {
    selected: 0,
    colors: [],
  }; },

  methods: {

    setColors (colors) {
      this.colors = colors;
    },

    onClick(index) {
      this.selected = index;
      bus.emit('reveal-color-picked', { color: this.colors[index] });
    }
  },

  mounted() {
    bus.on('reveal-colors', params => this.setColors(params.colors));
  }
}
</script>

<style lang="scss" scoped>

.color-picker {
  display: flex;
  position: absolute;
  bottom: 96px;
  left: 50%;
  transform: translate(-50%, 0);
  pointer-events: auto;

  button {
    position: relative;
    margin: 4px;
    width: 42px;
    height: 42px;
    padding: 0;
    border: 3.5px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }

  button[data-selected="true"]::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -1px;
    border: 2.5px solid white;
    border-radius: 50%;
  }
}

</style>