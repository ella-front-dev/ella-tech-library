<template>
  <div class="hashtag-area">
    <div class="hashtag-box">
      <HashtagItem
        v-for="(item, index) in state.tagSet"
        :key="index"
        :index="index"
        :hashtag="item"
        :prefix="'#'"
        @update-delete="handleOnDeleteTag(index)"
      />
    </div>
    <TagInput
      :hashtag-set="hashtagSet"
      :tag-set="state.tagSet"
      @update="handleOnSelectTag"
      @delete="handleOnPopTag"
      @check-double-tag="checkDoubleTag"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { toastMessage } from '@/plugins/toastMessage'
import TagInput from '@/components/hashtag/TagInput.vue'
import HashtagItem from '@/components/hashtag/HashtagItem.vue'
import { hashtagSetType } from '@/components/hashtag/HashtagMenu.vue'

export default defineComponent({
  name: 'BaseHashtag',
  components: {
    TagInput,
    HashtagItem,
  },
  props: {
    hashtagSet: {
      required: true,
      type: Array as PropType<hashtagSetType>,
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['updateTags'],
  setup(props, { emit }) {
    const state = reactive<{
      tagSet: hashtagSetType[]
      totalTagLength: number
    }>({
      tagSet: [],
      totalTagLength: 0,
    })

    watch(state.tagSet, (current) => {
      emit('updateTags', current)
    })

    // Add Tag
    const handleOnPushTag = (str: string) => {
      state.tagSet.push(str)
      const filterTag = props.hashtagSet.filter(
        (item: hashtagSetType) => item.hashtagNm === str,
      )
      if (filterTag.length > 0) {
        state.tagSet.push(filterTag)
      } else {
        const newTag = { hashtagNm: str, hashtagSn: -1 }
        state.tagSet.push(newTag)
      }
    }

    // Select Tag
    const handleOnSelectTag = (item: string) => {
      state.tagSet.push(item)
    }

    // Delete select tag index
    const handleOnPopTag = () => {
      state.tagSet.pop()
    }

    const handleOnDeleteTag = (index: number) => {
      state.tagSet.splice(index, 1)
    }

    const checkDoubleTag = (str: string) => {
      const findTag = state.tagSet.findIndex((item) => item.hashtagNm === str)
      if (findTag === -1) {
        return handleOnPushTag()
      } else {
        toastMessage('중복된 태그입니다.')
      }
    }

    return {
      state,
      handleOnPushTag,
      handleOnPopTag,
      handleOnDeleteTag,
      checkDoubleTag,
      handleOnSelectTag,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag-area {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 15px;
  background-color: $color-white;
  border-radius: 8px;
  border: 1px solid $color-bg-custom-2;
}

.hashtag-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  .btn-close {
    margin-left: 8px;
  }
}
</style>
