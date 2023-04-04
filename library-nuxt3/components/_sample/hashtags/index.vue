<template>
  <div class="hashtags">
    <HashtagItem v-for="(hashtag, index) in hashtags" :key="index" :hashtag="hashtag" :prefix="prefix" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import HashtagItem from '@/components/base/hashtags/Hashtag.vue'
import { Hashtag } from '@/store/common/type'

export default defineComponent({
  name: 'BaseHashtags',
  components: {
    HashtagItem
  },
  props: {
    hashtags: {
      required: true,
      type: Array as PropType<Hashtag[]>
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

.hashtags {
  flex-wrap: wrap;
  display: flex;
  gap: 10px;
}
</style>
