<template>
  <div class="hashtag">
    <span>{{`${prefix} `}}{{hashtag.hashtagNm}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Hashtag } from '@/store/common/type'

export default defineComponent({
  name: 'HashtagItem',
  props: {
    hashtag: {
      required: true,
      type: Object as PropType<Hashtag>
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag {
  display: flex;
  align-items: center;
  width: auto;
  height: 30px;
  padding: 3px 10px;
  border-radius: 14px;
  background-color: $color-bg-1;
  flex-shrink: 0;

  @include ellipsis(1);
  @include text-style($text-body-14-regular);
  color: $color-text-4;
}
</style>
