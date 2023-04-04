<template>
  <div class="hashtag">
    <span>{{ `${prefix} ` }}{{ hashtag }}</span>
    <button
      type="button"
      class="btn-close"
      @click="$emit('updateDelete', index)"
    >
      <BaseIcon :icon="{ type: 'outline', name: 'close-compact' }" :size="20" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HashtagItem',
  props: {
    hashtag: {
      required: true,
      type: String,
    },
    index: {
      type: Number,
      default: 0,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  emits: ['updateDelete'],
  setup() {
    
    return {}
  },
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
  border-radius: 30px;
  background-color: $color-secondary-red-light-10;
  flex-shrink: 0;

  @include text-style($text-body-14-regular);
  color: $color-secondary-red-light-80;

  .btn-close {
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
}
</style>
