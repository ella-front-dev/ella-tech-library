<template>
  <div :class="['loading-indicator-global', { on: layoutStore.loadingIndicatorGlobal }]">
    <div class="dim"></div>
    <BaseLoadingIndicator
      v-if="layoutStore.loadingIndicatorGlobal"
      :size="80"
      :fill="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutStore } from '@/store'
import BaseLoadingIndicator from '@/components/base/LoadingIndicator.vue'

export default defineComponent({
  name: 'LoadingIndicatorGlobal',
  components: {
    BaseLoadingIndicator
  },
  setup() {
    const layoutStore = useLayoutStore()

    return { layoutStore }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.loading-indicator-global {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: $z-index-loading-indicator-global;

  &.on {
    pointer-events: auto;

    .dim {
      opacity: 1;
    }
  }

  .dim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: hex-to-rgba($color-black, .65);
    @include transition(opacity .2s ease-in-out)
  }
}
</style>
