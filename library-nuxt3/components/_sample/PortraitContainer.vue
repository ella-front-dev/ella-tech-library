<template>
  <div :class="['portrait-container', sizeClass, hasActionClass]">
    <BaseImageContainer
      :image-url="$props.imageUrl"
      :empty-type="'portrait'"
      :ratio="'1:1'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import BaseImageContainer from '@/components/base/ImageContainer.vue'

type Size = 'sm' | 'md' | 'lg' | 'xl'

export default defineComponent({
  name: 'BasePortraitContainer',
  components: {
    BaseImageContainer
  },
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<Size>,
      default: 'md'
    },
    hasAction: {
      type: Boolean,
      default: () => true
    }
  },
  setup(props) {
    const sizeClass = computed(() => `size-${props.size}`)
    const hasActionClass = computed(() => props.hasAction ? 'has-action' : '')

    return { sizeClass, hasActionClass }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';

.portrait-container {
  display: block;
  overflow: hidden;

  &.has-action {
    cursor: pointer;
  }

  @mixin size ($size) {
    width: $size;
    height: $size;
    border-radius: calc($size / 2);
  }

  &.size-sm {
    @include size(40px);
  }

  &.size-md {
    @include size(50px);
  }

  &.size-lg {
    @include size(100px);
  }

  &.size-xl {
    @include size(360px);
  }
}
</style>
