<template>
  <div :class="['portrait-container', sizeClass, hasActionClass]">
    <div :class="['inner', { stroke }, emptyType]">
      <ImageContainer
        :image-url="imageUrl"
        :empty-type="emptyType"
        :ratio="'1:1'"
        :stroke="stroke"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import ImageContainer from '@/components/base/ImageContainer.vue'

type Size = 'sm' | 'md' | 'lg' | 'xl'

export default defineComponent({
  name: 'BasePortraitContainer',
  components: {
    ImageContainer
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
    stroke: {
      type: Boolean,
      default: false
    },
    hasAction: {
      type: Boolean,
      default: () => true
    },
    emptyType: {
      type: String as PropType<'portrait' | 'magnifier' >,
      default: 'portrait'
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
  position: relative;
  flex-shrink: 0;
  display: block;

  &.has-action {
    cursor: pointer;
  }

  @mixin size ($size) {
    width: $size;
    height: $size;

    > .inner {
      border-radius: calc($size / 2);

      &.magnifier {
         border-radius: 0;
      }
    }

  }

  &.size-sm {
    @include size(40px);

    > .inner.stroke { border: 2px solid $color-bg-3; }
  }

  &.size-md {
    @include size(50px);

    > .inner.stroke { border: 2px solid $color-bg-3; }
  }

  &.size-lg {
    @include size(100px);

    > .inner.stroke { border: 4px solid $color-bg-3; }
  }

  &.size-xl {
    @include size(130px);

    > .inner.stroke { border: 4px solid $color-bg-3; }
  }

  > .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
