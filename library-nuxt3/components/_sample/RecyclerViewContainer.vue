<template>
  <div
    ref="recyclerViewContainer"
    class="recycler-view-container"
  >
    <div
      v-for="(item, index) in sliceList"
      :id="index === 0 ? 'start' : (index === sliceList.length - 1 ? 'end' : '')"
      :ref="el => { recyclerViewItems[index] = el }"
      :key="index"
      :style="{ top: (index + state.start) * (634 + gap) + 'px' }"
      class="recycler-view-item"
    >
<!--      :style="{ top: (index + state.start) * (recyclerViewItemsHeight[index] + 10) + 'px' }"-->
      <slot name="item" :data="item" />
    </div>

<!--    <div
      v-for="(item, index) in sliceList"
      :key="index"
      class="recycler-view-item-invisible"
    >
      <slot name="item" :data="item" />
    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'BaseRecyclerViewContainer',
  props: {
    list: {
      required: true,
      type: Array as PropType<any[]>
    },
    threshold: {
      type: Number,
      default: 20
    },
    gap: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const recyclerViewContainer = ref<Element | null>(null)
    const recyclerViewItems = ref<Element[]>([])
    const state =
      reactive<{ observer: IntersectionObserver | null, start: number, end: number, offset: number }>({
        observer: null,
        start: 0,
        end: props.threshold,
        offset: Math.min(props.threshold, 10)
      })
    const sliceList = computed(() => props.list.slice(state.start, state.end))
    const recyclerViewItemsHeight = computed(() => recyclerViewItems.value.map(item => item.clientHeight))

    onMounted(() => {
      initObserver()

      console.log(recyclerViewItemsHeight.value)
    })

    onUnmounted(() => {
      uninstallObserver()
    })

    const initObserver = () => {
      state.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (
              entry.isIntersecting &&
              entry.target.id === 'start' &&
              state.start > 0
            ) {
              state.start = Math.max(state.start - state.offset, 0)
              state.end = state.start + props.threshold
              console.log('scroll up:', state.start, state.end, sliceList.value)
            }

            if (
              entry.isIntersecting &&
              entry.target.id === 'end' &&
              state.end < props.list.length
            ) {
              state.end = Math.min(state.end + state.offset, props.list.length)
              state.start = state.end - props.threshold
              console.log('scroll down:', state.start, state.end, sliceList.value)
            }
          })
        },
        { root: document.querySelector('.recycler-view-container') }
      )

      state.observer?.observe(document.querySelector('#start')!)
      state.observer?.observe(document.querySelector('#end')!)
    }

    const uninstallObserver = () => {
      if (state.observer) {
        state.observer?.unobserve(document.querySelector('#start')!)
        state.observer?.unobserve(document.querySelector('#end')!)
      }
    }

    return { recyclerViewContainer, recyclerViewItems, state, sliceList, recyclerViewItemsHeight }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.recycler-view-container {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  // visible item
  .recycler-view-item {
    position: absolute;
    width: 100%;
    height: auto;
  }

  // invisible item
  .recycler-view-item-invisible {
    position: absolute;
    width: 100%;
    height: auto;
  }
}
</style>
