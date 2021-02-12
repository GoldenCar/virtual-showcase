<template>
  <a :style="style" target="_blank"><slot></slot></a>
</template>

<script>
const colors = {
  blue: { background: '#00ADEF', text: '#fff' },
};

export default {
  props: {
    color: { type: String, default: 'blue' },
  },

  computed: {
    style () {
      return { background: colors[this.color].background, color: colors[this.color].text };
    }
  }
}
</script>

<style scoped>
a {
  display: block;
  width: 130px;
  height: 40px;
  padding: 9px 0 0;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  text-align: center;
  border: none;
  border-radius: none;
  font-family: 'Segoe UI';
  text-decoration: none;
  box-sizing: border-box;
}
</style>