<template>
  <div
    :class="$style.container"
    :style="{
      backgroundColor: colors[color] || color
    }"
    @click="$emit('click', $event)"
  >
    <span><slot /></span>
  </div>
</template>

<script>
export default {
    props: {
        color: { type: String, default: 'blue' },
        onClick: { type: Function, default: function () {} },
    },
    emits: ['click'],
    data: () => ({
        colors: {
            primary: '#1693ca',
            red: '#f16731',
            green: '#8fc649',
            blue: '#1eafee',
            yellow: '#fec131',
        },
    }),
};
</script>

<style lang="scss" module>
.container {
  border-left: 12px solid white;
  padding: 20px;
  margin: 0 0 30px 0;
  cursor: pointer;
  span {
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 20px;
  }
}
</style>
