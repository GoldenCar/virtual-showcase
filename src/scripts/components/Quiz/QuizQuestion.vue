<template>
  <div :class="$style.container">
    <div :class="$style.question">
      <slot />
    </div>
    <div :class="$style.buttonsContainer">
      <QuizButton
        v-for="(item, index) in buttons"
        :key="index"
        :color="item.color"
        @click="item.click"
      >
        {{ item.title }}
      </QuizButton>
    </div>
  </div>
</template>

<script>
import QuizButton from './QuizButton';

export default {
    components: { QuizButton },
    props: {
        buttons: { default: () => [], type: Array },
    },
};
</script>

<style lang="scss" module>
.container {
  .question {
    font-size: 35px;
    color: white;
    margin: 0 0 100px 0;
    font-weight: 200;
  }
  .buttonsContainer {
    width: 250px;
  }
}
</style>
