<template>
  <ul ref="menuContainer" class="hashtag-menu-box">
    <li
      v-for="(item, index) in filterTags"
      ref=""
      :class="['hashtag-menu', index === activeIdx ? 'active ' : '']"
      @click="$emit('on-click', item)"
    >
      <span class="label">{{ item.hashtagNm }}</span>
    </li>
  </ul>
  <!-- <ul ref="menuContainer" class="hashtag-menu-box">
    <HashtagMenu
      v-for="(item, index) in filterTags"
      :ref="
        (el) => {
          menuItemRef[index] = el
        }
      "
      :key="index"
      :index="index"
      :item="item"
      :active-index="props.activeIndex"
      @click="clickOnMenu(item)"
    />
  </ul> -->
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { detectElementInViewport } from '@/plugins/detectElementInViewport'

export type hashtagSetType = {
  hashtagNm: string
  hashtagSn: number
}

export default defineComponent({
  name: 'HashtagMenu',
  props: {
    filterTags: {
      required: true,
      type: Array as PropType<hashtagSetType[] | []>,
    },
    activeIndex: {
      type: Number as PropType<number | null>,
      default: null,
    },
  },
  emits: ['on-click', 'on-update'],
  setup(props, { emit }) {
    const state = reactive({
      activeIndex: 0,
    })
    const activeIdx = computed((item) => props.activeIndex)
    let itemRefs = ref([])
    const setItemRef = (el: HTMLElement) => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })

    const handleOnChoiceTag = (type: 'increase' | 'decrease') => {
      if (props.activeIndex === null) {
        emit('on-update', 0)
        return
      }
      if (props.activeIndex === props.filterTags.length - 1) {
        emit('on-update', null)
        return
      }

      switch (type) {
        case 'increase':
          emit('on-update', (props.activeIndex % props.filterTags.length) + 1)
          // if (
          //   !detectElementInViewport(
          //     menuItemRef.value[props.activeIndex].$el,
          //     menuContainer.value,
          //   )
          // ) {
          //   menuItemRef.value[props.activeIndex].$el.scrollIntoView()
          // }
          break
        case 'decrease':
          emit(
            'on-update',
            props.activeIndex - 1 > 0 ? props.activeIndex - 1 : 0,
          )
          // if (
          //   !detectElementInViewport(
          //     menuItemRef.value[props.activeIndex].$el,
          //     menuContainer.value,
          //     'top',
          //   )
          // ) {
          //   menuItemRef.value[props.activeIndex].$el.scrollIntoView()
          // }
          break
        default:
          throw new Error('handle on choice tag type is not match')
      }
    }

    return { state, activeIdx, handleOnChoiceTag }
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
