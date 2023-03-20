<template>
  <li :class="['hashtag-menu', index === activeIndex ? 'active ': '' ]">
    <span class="label">{{item}}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HashtagMenu',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    item: {
      required: true,
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  min-height: 32px;
  color: $color-black-60p;
  padding: 6px 12px;

  @include transition(all .15s ease-in-out);

  &:hover,
  &:focus,
  &.active {
    background-color: $color-black-3p;
  }

  > .label {
    font-size: 12px;
    font-weight: 400;
    text-align: left;
  }
}
</style>
