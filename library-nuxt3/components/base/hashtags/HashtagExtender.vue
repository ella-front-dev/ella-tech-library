<template>
  <div :class="['hashtag-extender', { extended: showMore }]">
    <div class="hashtags">
      <BaseHashtag
        v-for="hashtag in showTagsList"
        :key="hashtag.hashtagSn"
        :hashtag="hashtag"
        :able-action="true"
        :on="modelValue === hashtag.hashtagSn"
        class="hashtag-item"
        @click="() => handleOnUpdate(hashtag)"
      />

      <div v-if="extendAble" class="indicator-wrap">
        <BaseButtonsIcon
          :icon="{ type: 'outline', name: 'carrot-bottom' }"
          class="indicator"
          @click="handleOnToggleExtend"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { Hashtag } from '@/store/etc/type'
import BaseHashtag from '@/components/base/hashtags/Hashtag.vue'
import BaseButtonsIcon from '@/components/base/buttons/Icon.vue'

export default defineComponent({
  name: 'HashTagExtender',
  components: {
    BaseHashtag,
    BaseButtonsIcon
  },
  props: {
    modelValue: {
      required: true,
      type: Object as PropType<Hashtag>
    },
    hashtags: {
      required: true,
      type: Array as PropType<Hashtag[]>
    },
    minHashtags: {
      type: Number,
      default: 5
    },
    maxHashtags: {
      type: Number,
      default: 10
    }
  },
  emits: {
    'update:modelValue': (_value: Hashtag) => true
  },
  setup(props, { emit }) {
    const showMore = ref(false)
    const extendAble = computed(() => props.hashtags.length > props.minHashtags)
    const showTagsList = computed(() =>
      showMore.value
        ? props.hashtags.slice(0, props.maxHashtags)
        : props.hashtags.slice(0, props.minHashtags)
    )

    const handleOnUpdate = (hashtag: Hashtag) => {
      emit('update:modelValue', hashtag)
    }

    const handleOnToggleExtend = () => {
      showMore.value = !showMore.value
    }

    return { showMore, extendAble, showTagsList, handleOnUpdate, handleOnToggleExtend }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag-extender {
  position: relative;
  display: flex;

  &.extended {
    .indicator-wrap > .indicator {
      transform: rotate(180deg);
    }
  }

  .hashtags {
    flex-wrap: wrap;
    display: flex;
    column-gap: 8px;
    row-gap: 10px;
    width: 100%;
  }

  .indicator-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > .indicator {
      color: $color-text-4;
      @include transition(transform .2s ease-in-out);
    }
  }
}
</style>
