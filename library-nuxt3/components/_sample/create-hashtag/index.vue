<template>
  <div class="hashtag-area">
    <div class="hashtag-box">
      <span v-for="(item, index) in state.tagSet" :key="index" class="tag">
        <em>{{ item.hashtagNm }}</em>
        <button type="button" @click.prevent="handleOnDeleteTag(index)">
          <BaseIcon :icon="{ type: 'outline', name: 'close' }" :size="12" />
        </button>
      </span>
    </div>
    <TagInput
      :hashtag-set="hashtagSet"
      :tag-set="state.tagSet"
      @update="handlenOnSelectTag"
      @delete="handleOnPopTag"
      @check-double-tag="checkDoubleTag"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import BaseIcon from '@/components/base/Icon.vue'
import { hashtagSetType } from '@/components/hashtag/create-hashtag/HashtagMenuBox.vue'
import TagInput from '@/components/hashtag/create-hashtag/TagInput.vue'

export default defineComponent({
  name: 'BaseCreateHashtag',
  components: {
    BaseIcon,
    TagInput,
  },
  props: {
    hashtagSet: {
      required: true,
      type: Array as PropType<hashtagSetType[]>,
    },
  },
  setup(props) {
    const state = reactive<{
      tagSet: hashtagSetType[]
      totalTagLength: number
    }>({
      tagSet: [],
      totalTagLength: 0,
    })
    const handlenOnPushTag = (str: string) => {
      const filterTag = props.hashtagSet.filter(
        (item) => item.hashtagNm === str,
      )
      if (filterTag.length > 0) {
        state.tagSet.push(filterTag[0])
      } else {
        const newTag = { hashtagNm: str, hashtagSn: -1, langCode: 'KO' }
        state.tagSet.push(newTag)
      }
    }

    const handlenOnSelectTag = (item: hashtagSetType) => {
      console.log('item', item)
      state.tagSet.push(item)
    }

    const handleOnPopTag = () => {
      state.tagSet.pop()
    }

    const handleOnDeleteTag = (index: number) => {
      console.log('tagSet ', state.tagSet)
      state.tagSet.splice(index, 1)
    }

    const checkDoubleTag = (str: string) => {
      const findTag = state.tagSet.findIndex((item) => item.hashtagNm === str)
      if (findTag === -1) {
        return handlenOnPushTag(str)
      } else {
        alert('중복된 태그가 있습니다.')
      }
    }

    return {
      state,
      handlenOnPushTag,
      handleOnPopTag,
      handleOnDeleteTag,
      checkDoubleTag,
      handlenOnSelectTag,
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
  padding: 10px 15px;
  width: 100%;
  background-color: $color-white;
  border-radius: 8px;
  border: 2px solid $color-border-1;
}

.hashtag-box {
  display: flex;
  align-items: center;
  gap: 8px;
  .tag {
    position: relative;
    padding-left: 20px;
    border-radius: 8px;
    background-color: $color-secondary-blue-light-30;
    color: $color-white;

    > button {
      margin-left: 8px;
      color: $color-white;
    }

    &:before {
      content: '#';
      position: absolute;
      left: 8px;
    }
  }
}
</style>
