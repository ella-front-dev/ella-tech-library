<template>
  <div :class="['hashtag', { 'able-action': ableAction }, { on }]">
    <span class="label">{{`${prefix} `}}{{hashtagName}}</span>
    <slot name="tools" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Hashtag } from '@/store/etc/type'

export default defineComponent({
  name: 'HashtagItem',
  props: {
    on: {
      type: Boolean,
      default: false
    },
    ableAction: {
      type: Boolean,
      default: false
    },
    hashtag: {
      required: true,
      type: [Object, String] as PropType<Hashtag | string>
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const hashtagName = computed(() => typeof props.hashtag === 'object' ? props.hashtag.hashtagNm : props.hashtag)

    return { hashtagName }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: auto;
  max-width: 100%;
  height: 28px;
  padding: 3px 10px;
  border-radius: 14px;
  background-color: $color-bg-1;
  @include transition(background-color .2s ease-in-out);

  &.able-action {
    cursor: pointer;
  }

  &.on {
    background-color: $color-secondary-blue-light-10;

    > .label {
      color: $color-text-2;
    }
  }

  > .label {
    @include text-style($text-body-14-regular);
    color: $color-text-4;
    @include ellipsis(1);
    @include transition(color .2s ease-in-out);
  }
}
</style>
