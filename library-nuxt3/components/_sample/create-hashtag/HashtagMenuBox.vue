<template>
  <li :class="['hashtag-menu', index === activeIndex ? 'active ' : '']">
    <span class="label">{{ item.hashtagNm }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type hashtagSetType = {
  hashtagNm: string
  hashtagSn: number
  langCode: string
}

export default defineComponent({
  name: 'HashtagMenuBox',
  props: {
    activeIndex: {
      type: Number as PropType<number | null>,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    item: {
      required: true,
      type: Object as PropType<hashtagSetType>,
    },
  },
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

  @include transition(all 0.15s ease-in-out);

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
