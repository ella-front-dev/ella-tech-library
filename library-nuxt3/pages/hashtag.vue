<template>
  <div class="container">
    <h2 class="title">Hashtag Sample</h2>
    <div class="content">
      <div class="section">
        <span class="sub-title">기본 Tag Sample 1</span>
        <BaseHashtag :hashtag-set="state.data" @update-tags="onUpdateTags" />
      </div>
      <div class="section">
        <span class="sub-title">기본 Tag Sample 2</span>
        <BaseHashtag2 :hashtag-set="state.data2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { definePageMeta } from '#imports'
import BaseHashtag from '@/components/hashtag/index.vue'
import BaseHashtag2 from '@/components/hashtag/create-hashtag/index.vue'
import hashtagData from '@/assets/data/hashtag_data.json'
import hashtagData2 from '@/assets/data/hashtag_mock_data.json'
import { hashtagSetType } from '@/components/hashtag/HashtagMenu.vue'

definePageMeta({
  layout: 'sub',
})

export default defineComponent({
  components: {
    BaseHashtag,
    BaseHashtag2,
  },
  setup() {
    // data : demo data, tags: tags that added to tagSet
    const state = reactive<{
      data: hashtagSetType[]
      data2: []
      tags: hashtagSetType[] | []
    }>({
      data: JSON.parse(JSON.stringify(hashtagData)),
      data2: JSON.parse(JSON.stringify(hashtagData2)),
      tags: [],
    })

    const onUpdateTags = (tagSet: hashtagSetType[]) => {
      state.tags = tagSet
    }
    return { state, onUpdateTags }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 120px 24px;
  width: 100%;
  max-width: 960px;
}

.title {
  @include text-style($text-heading2-bold);
}

.content {
  width: 100%;

  .section {
    margin-top: 24px;
    border-top: 1px solid $color-text-5;
  }
}

.sub-title,
.option-title {
  display: block;
  margin-top: 14px;
  padding-bottom: 8px;
  font-weight: 700;
}

.option-list {
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    .list-title {
      font-weight: 500;
    }
    .list-content {
      padding: 16px 24px;
    }
  }
}
</style>
