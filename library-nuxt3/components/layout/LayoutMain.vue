<template>
  <main :class="['main', { 'page-mode': pageMode }]">
    <div :class="['inner']">
      <div
        v-if="slots.left"
        class="left"
      >
        <slot name="left" />
      </div>
      <div class="center">
        <slot name="center" class="page" />
      </div>
      <div
        v-if="slots.right"
        class="right"
      >
        <slot name="right" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, useSlots, } from 'vue'

export default defineComponent({
  name: 'LayoutMain',
  props:{
    pageMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const slots = useSlots()
  

    return { slots }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.page-mode {
    overflow-y: overlay;

    > .inner {
      height: fit-content;

      > .left {
        position: sticky;
        top: 0;
      }

      > .center {
        height: auto;
        overflow: visible;
      }

      > .right {
        position: sticky;
        top: 0;
      }
    }
  }

  > .inner {
    @include inner-base;

    > .left {
      @include inner-left-base;
    }

    > .center {
      @include inner-center-base;
    }

    > .right {
      @include inner-right-base;
    }
  }

  @include tablet {
    .inner {
      max-width: calc(900px + 16px + 16px);

      > .right { display: none; }
    }
  }

  @include mobile {
    .inner { padding: 0; }

    .inner {
      > .left { display: none; }
    }
  }
}
</style>
