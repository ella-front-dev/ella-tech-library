<template>
  <hr :class="['divider', direction]" :style="{ height: `${dynamicHeight}px` }" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BaseDivider',
  props: {
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal'
    },
    gap: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const dynamicHeight = computed(() => props.direction === 'vertical' && props.height === 1 ? 30 : props.height )

    return { dynamicHeight }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.divider {
  border: 0;
  background-color: $color-black-10p;

  &.horizontal {
    height: 1px;
  }

  &.vertical {
    width: 1px;
    height: 100%;
  }
}
</style>
