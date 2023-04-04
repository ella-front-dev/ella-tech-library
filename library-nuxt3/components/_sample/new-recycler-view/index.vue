<template>
  <div
    ref="recyclerViewRef"
    class="recycler-view"
    :style="{
      overflowY: pullToRefreshStatus === 'default' ? 'auto' : 'visible',
      pointerEvents: pullToRefreshStatus === 'loading' ? 'none' : 'auto'
    }"
  >
    <!-- pull to refresh -->
    <div class="recycler-view-pull-to-refresh">
      <div class="top-load-wrapper">
        <!-- pull to refresh: pull -->
        <BaseIcon
          v-if="pullToRefreshStatus === 'trigger-under' || pullToRefreshStatus === 'trigger-over'"
          :icon="{ type: 'outline', name: 'chev-bottom' }"
          :class="[
            'top-load-icon',
            { 'trigger-over': pullToRefreshStatus === 'trigger-over' }
          ]"
        />

        <!-- pull to refresh: loading -->
        <BaseLoadingIndicator
          v-else-if="pullToRefreshStatus === 'loading'"
          :size="88"
          :bg-bright="'light'"
          class="top-load-icon"
        />

        <!-- pull to refresh: loaded-done -->
        <BaseIcon
          v-else-if="pullToRefreshStatus === 'loaded-done'"
          :icon="{ type: 'outline', name: 'check' }"
          class="top-load-icon"
        />
      </div>
    </div>

    <slot name="banner" />

    <!-- items: rear -->
    <div
      class="recycler-view-items"
      :style="{
        height: `${recyclerViewHeight}px`,
        opacity: isRefreshing ? '0' : '1',
        paddingTop: `${listTopPadding}px`
      }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="recycler-view-item"
        :style="{ transform: `translate3d(0, ${item.top}px, 0)` }"
      >
        <div
          v-show="skeleton"
          :class="[
            'recycler-view-skeleton',
            { 'recycler-view-transition': skeleton }
          ]"
          :style="{ opacity: +!item.loaded }"
        >
          <slot name="skeleton"></slot>
        </div>

        <div
          :class="[
            'recycler-view-item',
            { 'recycler-view-transition': skeleton }
          ]"
          :style="{ opacity: +item.loaded }"
        >
          <slot name="item" :data="item.data" :index="index" :dummy="false"></slot>
        </div>
      </div>
    </div>

    <!-- items: get skeleton and item heights from invisible dom -->
    <div class="recycler-view-pool">
      <div
        v-for="(item, index) in recyclerViewItems"
        :ref="el => { recyclerViewItemsRefs[index] = el }"
        :key="index"
        class="recycler-view-item recycler-view-invisible"
      >
        <slot name="item" :data="item.data" :index="index" :dummy="true" />
      </div>
      <div ref="tombRef" class="recycler-view-item recycler-view-invisible">
        <slot name="skeleton" />
      </div>
    </div>

    <!-- load more: loading -->
    <div
      v-show="loading && !noMore && !skeleton && !isEmpty"
      class="recycler-view-loading"
      :style="{ visibility: loading ? 'visible' : 'hidden' }"
    >
      <BaseLoadingIndicator
        :size="88"
        :bg-bright="'light'"
        class="top-load-icon"
      />
    </div>

    <!-- empty -->
    <div
      v-show="isEmpty"
      class="empty"
    >
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick, PropType, onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from '@/components/base/Icon.vue'
import BaseLoadingIndicator from '@/components/base/LoadingIndicator.vue'

interface RecyclerViewItem {
  data: Object
  height: number
  top: number
  tomb: boolean
  loaded: boolean
}

type PullToRefreshStatus =
  | 'default'
  | 'trigger-over'
  | 'trigger-under'
  | 'loading'
  | 'loaded-done'

export default defineComponent({
  name: 'NewRecyclerView',
  components: {
    BaseIcon,
    BaseLoadingIndicator
  },
  props: {
    list: {
      type: Array as PropType<any>,
      required: true
    },
    skeleton: {
      type: Boolean,
      default: false // Whether to show skeletons.
    },
    size: {
      type: Number,
      default: 10 // The number of items added each time.
    },
    offset: {
      type: Number,
      default: 200 // The number of pixels of additional length to allow scrolling to.
    },
    loadMore: {
      required: true, // loading more items.
      type: Function
    },
    spinner: {
      type: Boolean,
      default: true // show loading spinner.
    },
    noMore: {
      type: Boolean,
      default: false // show 'no more data' status bar
    },
    isEmpty: {
      type: Boolean,
      default: false
    },
    isRefreshing: {
      type: Boolean,
      default: false
    },
    listTopPadding: {
      type: Number,
      default: 0
    }
  },
  emits: ['pullToRefresh'],
  setup(props, { emit }) {
    // elements
    const recyclerViewRef = ref<HTMLElement | null>(null)
    const tombRef = ref<HTMLElement | null>(null)
    const recyclerViewItemsRefs = ref<HTMLElement[]>([])

    // pull to refresh
    const pStart = ref({ x: 0, y: 0 })
    const pCurrent = ref({ x: 0, y: 0 })
    const pullToRefreshStatus = ref<PullToRefreshStatus>('default')
    const pullToRefreshRate = ref(0.4)
    // const swipeEndDurance = ref(false)

    // recycler view
    const recyclerViewItems = ref<RecyclerViewItem[]>([]) // wrapped full list items
    const recyclerViewHeight = ref(0) // recycler-view height
    const loadings = ref<number[]>([]) // loading que
    const loading = computed(() => loadings.value.length > 0)
    const isEmpty = computed(() => props.noMore && props.list.length === 0)
    const start = ref(0)
    const startOffset = ref(0)
    const visibleItems = computed(
      () =>
        recyclerViewItems.value.slice(
          Math.max(0, start.value - props.size),
          Math.min(recyclerViewItems.value.length, start.value + props.size)
        )
    )
    const tombRefHeight = computed(() => props.skeleton ? tombRef.value?.offsetHeight || 0 : 0)

    watch(props.list, (cur) => {
      if (cur.length > 0) {
        loadings.value.pop()
      }
    },{ immediate: true })

    onMounted(() => {
      // mounted: pull to refresh events listener
      recyclerViewRef.value!.addEventListener('touchstart', evt => handleOnSwipeStart(evt), false)
      recyclerViewRef.value!.addEventListener('touchmove', evt => handleOnSwipe(evt), false)
      recyclerViewRef.value!.addEventListener('touchend', () => handleOnSwipeEnd(), false)

      // mounted: scroll events listener
      recyclerViewRef.value!.addEventListener('scroll', () => handleOnScroll())

      // mounted: resize events listener
      window.addEventListener('resize', () => handleOnResize())

      // mounted: init
      init()
    })

    onBeforeUnmount(() => {
      // beforeUnMount: pull to refresh events listener
      recyclerViewRef.value!.removeEventListener('touchstart', evt => handleOnSwipeStart(evt))
      recyclerViewRef.value!.removeEventListener('touchmove', evt => handleOnSwipe(evt))
      recyclerViewRef.value!.removeEventListener('touchend', () => handleOnSwipeEnd())

      // beforeUnMount: scroll events listener
      recyclerViewRef.value!.removeEventListener('scroll', () => handleOnScroll())

      // beforeUnMount: resize events listener
      window.removeEventListener('resize', () => handleOnResize())
    })

    const init = () => {
      reset()
      load()
    }

    const reset = () => {
      recyclerViewItems.value = []
      recyclerViewHeight.value = 0
      start.value = 0
      recyclerViewRef.value!.scrollTop = 0
    }

    const load = () => {
      if (props.skeleton) {
        console.info('recyclerView:load:skeleton', props.skeleton)
        recyclerViewItems.value.length += props.size
        handleOnLoadItems()
      } else if (!loading.value) {
        console.info('recyclerView:load:skeleton', props.skeleton)
        handleOnGetItems()
      }
      console.info('recyclerView:load')
    }

    const handleOnGetItems = () => {
      loadings.value.push(1)
      props.loadMore()
    }

    const handleOnLoadItems = () => {
      const loads = []
      const startIdx = 0
      const endIdx = props.skeleton ? recyclerViewItems.value.length : props.list.length

      for (let i = startIdx; i < endIdx; i ++) {
        if (typeof recyclerViewItems.value[i] !== 'undefined') recyclerViewItems.value[i].data = props.list[i]
        if (recyclerViewItems.value[i] && recyclerViewItems.value[i].loaded) {
          continue
        }
        handleOnSetItem(i, props.list[i] || {})
        // await nextTick()
        loads.push(nextTick().then(() => {
          handleOnUpdateItemHeight(i)
        }))
      }

      Promise.all(loads).then(() => {
        handleOnUpdateItemTop()
      })
    }

    const handleOnSetItem = (index: number, data: Object): void => {
      console.log('handleOnSetItem:recyclerViewItems', recyclerViewItems)
      recyclerViewItems.value[index] = {
        data,
        height: 0,
        top: -1000,
        tomb: !data,
        loaded: !!data
      }
    }

    const handleOnUpdateItemHeight = (index: number) => {
      const cur = recyclerViewItems.value[index]
      const dom = recyclerViewItemsRefs.value[index]

      if (dom) {
        cur.height = dom.offsetHeight
      } else {
        cur.height = tombRefHeight.value
      }
    }

    const handleOnUpdateItemTop = () => {
      // load all items to update item top and list height
      recyclerViewHeight.value = 0
      for (let i = 0; i < recyclerViewItems.value.length; i ++) {
        const pre = recyclerViewItems.value[i - 1]
        recyclerViewItems.value[i].top = pre ? pre.top + pre.height : 0
        recyclerViewHeight.value += recyclerViewItems.value[i].height
      }

      // update scroll top when needed
      if (startOffset.value) {
        handleOnSetScrollTop()
      }
      handleOnUpdateItemIndex()
      handleOnMakeScrollable()
    }

    const handleOnUpdateItemIndex = () => {
      // update visible items start index
      const top = recyclerViewRef.value?.scrollTop || 0

      recyclerViewItems.value.some((item, index) => {
        const breakCondition = (item.top > top)

        if (breakCondition) {
          start.value = Math.max(0, index - 1)
        }

        return breakCondition
      })
      // scrolling does not need recalculate scroll top
      // handleOnGetStartItemOffset()
    }

    const handleOnGetStartItemOffset = () => {
      if (
        recyclerViewItems.value[start.value] &&
        recyclerViewRef.value
      ) {
        startOffset.value = recyclerViewItems.value[start.value].top - recyclerViewRef.value.scrollTop
      }
    }

    const handleOnSetScrollTop = () => {
      if (
        recyclerViewItems.value[start.value] &&
        recyclerViewRef.value
      ) {
        recyclerViewRef.value.scrollTop = recyclerViewItems.value[start.value].top - startOffset.value
      }
    }

    const handleOnMakeScrollable = () => {
      recyclerViewRef.value?.classList.add('recycler-view-scrollable')
    }

    const handleOnSwipeStart = (evt: TouchEvent | MouseEvent) => {
      recyclerViewRef.value!.style.transitionDuration = '0ms'
      recyclerViewRef.value!.style.transitionProperty = 'none'

      // touch
      if (typeof (evt as TouchEvent).targetTouches !== 'undefined') {
        const touch = (evt as TouchEvent).targetTouches[0]
        pStart.value.x = touch.screenX
        pStart.value.y = touch.screenY
      }

      // mouse
      else {
        const mouse = evt as MouseEvent
        pStart.value.x = mouse.screenX
        pStart.value.y = mouse.screenY
      }
    }

    const handleOnSwipe = (evt: TouchEvent | MouseEvent) => {
      // touch
      if (typeof (evt as TouchEvent).targetTouches !== 'undefined') {
        const touch = (evt as TouchEvent).targetTouches[0]
        pCurrent.value.x = touch.screenX
        pCurrent.value.y = touch.screenY
      }

      // mouse
      else {
        const mouse = evt as MouseEvent
        pCurrent.value.x = mouse.screenX
        pCurrent.value.y = mouse.screenY
      }

      const changeY = pStart.value.y - pCurrent.value.y

      if (recyclerViewRef.value!.scrollTop === 0 && changeY < 0) {
        // loader icon status change
        if (changeY * pullToRefreshRate.value < -44) pullToRefreshStatus.value = 'trigger-over'
        else pullToRefreshStatus.value = 'trigger-under'

        // recycler view transform 3d y position
        const transformYPosition = Math.abs(changeY * pullToRefreshRate.value)
        recyclerViewRef.value!.style.transform =
          `translate3d(0, ${transformYPosition > 200 ? 200 : transformYPosition}px, 0)`
      }
    }

    const handleOnSwipeEnd = () => {
      // turn on transform 3d transition-durance animation
      recyclerViewRef.value!.style.transitionDuration = '200ms'
      recyclerViewRef.value!.style.transitionProperty = 'transform'

      // variable condition
      const changeY = pStart.value.y - pCurrent.value.y
      if (recyclerViewRef.value!.scrollTop === 0 && changeY * pullToRefreshRate.value < -44) {
        // change status to loading and call refresh event
        pullToRefreshStatus.value = 'loading'
        recyclerViewRef.value!.style.transform = 'translate3d(0, 44px, 0)'
        emit('pullToRefresh', handleOnRefreshLoaded)
      } else {
        pullToRefreshStatus.value = 'default'
        recyclerViewRef.value!.style.transform = 'translate3d(0, 0, 0)'
        handleOnSwipePositionReset()
      }
    }

    const handleOnSwipePositionReset = () => {
      pStart.value = { x: 0, y: 0 }
      pCurrent.value = { x: 0, y: 0 }
    }

    const handleOnRefreshLoaded = () => {
      pullToRefreshStatus.value = 'loaded-done'
      setTimeout(() => {
        pullToRefreshStatus.value = 'default'
        recyclerViewRef.value!.style.transform = 'translate3d(0, 0, 0)'
        handleOnSwipePositionReset()
      }, 1000)
    }

    const handleOnScroll = () => {
      if ((recyclerViewRef.value!.scrollTop + recyclerViewRef.value!.offsetHeight) > (recyclerViewHeight.value - props.offset)) {
        load()
      }
      handleOnUpdateItemIndex()
    }

    const handleOnResize = () => {
      handleOnGetStartItemOffset()
      recyclerViewItems.value.forEach(item => {
        item.loaded = false
      })
      handleOnLoadItems()
    }

    return {
      recyclerViewRef,
      recyclerViewItemsRefs,
      tombRef,
      recyclerViewItems,
      visibleItems,
      recyclerViewHeight,
      pullToRefreshStatus,
      start,
      startOffset,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

// animation duration
$duration: 500ms;

.recycler-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  // animation: default
  transition-property: none;
  transition-duration: 200ms;
  transition-delay: 0ms;
  transform: translate(0, 0);

  &.recycler-view-scrollable {
    -webkit-overflow-scrolling: touch;
  }

  // pull to refresh
  .recycler-view-pull-to-refresh {
    position: relative;
    margin-top: -44px;
    width: 100%;
    height: auto;

    .top-load-wrapper {
      width: 100%;
      height: 44px;
      padding: 10px 0;
      text-align: center;
      color: $color-text-3;

      > .top-load-icon {
        @include transition(all .2s);

        &.trigger-over {
          transform: rotate(180deg);
        }
      }
    }
  }

  // recycler view items
  .recycler-view-items {
    position: relative;
    margin: 0;
    padding: 0;

    .recycler-view-invisible {
      top: -1000px;
      visibility: hidden;
    }

    .recycler-view-item {
      position: absolute;
      width: 100%;

      .recycler-view-transition {
        position: absolute;
        opacity: 0;
        transition-property: opacity;
        transition-duration: $duration;
      }
    }
  }

  // recycler view loading
  .recycler-view-loading {
    overflow: hidden;

    .recycler-view-loading-content {
      width: 100%;
      text-align: center;

      > img {
        margin: 10px auto;
        width: 24px;
        height: 24px;
      }

      .spinner {
        margin: 10px auto;
        width: 20px;
        height: 20px;
      }

    }
  }

  .recycler-view-nomore {
    overflow: hidden;
    margin: 10px auto;
    height: 20px;
    text-align: center;
  }
}
</style>
