<template>
  <div :class="['loading-indicator', { fill }]">
    <LottieAnimation
      ref="lottie-animation"
      class="lottie"
      :loop="true"
      :animation-data="animationData"
      :style="{
        width: `${size}px`,
        height: `${size}px`
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { LottieAnimation } from 'lottie-web-vue'
import * as spinnerLineOnLight from 'assets/data/lottie/spinner-line-on-light.json'
import * as spinnerLineOnDark from 'assets/data/lottie/spinner-line-on-dark.json'

export default defineComponent({
  name: 'BaseLoadingIndicator',
  components: {
    LottieAnimation
  },
  props: {
    // 애니메이션 아이콘 사이즈
    size: {
      type: Number,
      default: 48
    },
    // 로딩 인디케이터가 보여지는 백그라운드의 밝기
    bgBright: {
      type: String as PropType<'light' | 'dark'>,
      default: 'on-dark'
    },
    // 부모 컨테이너를 채울지 여부
    fill: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const animationData = computed(() => {
      switch (props.bgBright) {
        case 'light':
          return spinnerLineOnLight
        case 'dark':
        default:
          return spinnerLineOnDark
      }
    })

    return { animationData }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  @include transition(opacity .15s);
  pointer-events: none;

  &.fill {
    width: 100%;
    height: 100%;
  }
}
</style>
