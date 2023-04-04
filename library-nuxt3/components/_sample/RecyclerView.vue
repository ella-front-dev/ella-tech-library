<template>
  <div
    ref="recyclerViewContainer"
    class="recycler-view-container"
    @scroll.passive="handleScroll"
  >
    <div
      v-if="data?.length"
      class="recycler-view-scroll-list"
      :style="{
        paddingTop: `${paddingTop}px`,
        height: `${containerHeight}px`
      }"
    >
      <div
        v-for="(item, index) in showDataList"
        :key="item[dataKey]"
        class="recycler-view-scroll-item"
        :style="`height: ${itemHeight}px`"
      >
        <slot :item="item" :index="index"></slot>
      </div>
      <div v-if="showLoading">
        <slot name="loading">
          <div class="recycler-view-loading">
            <span>Loading...</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, toRefs, PropType } from 'vue'

interface Props {
  data: any[]
  dataKey: string
  shoLoading: boolean
  itemHeight: number
  dataBuffer: number
  onComplete?: () => void
}

export default defineComponent({
  name: 'BaseRecyclerView',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataKey: {
      type: String,
      default: 'id'
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    itemHeight: {
      type: Number,
      default: 40
    },
    dataBuffer: {
      type: Number,
      default: 50
    },
    onComplete: {
      type: Function as PropType<Pick<Props, 'onComplete'>>,
      default: null
    }
  },
  setup(props) {
    const { data, dataBuffer, itemHeight, onComplete } = toRefs(props)
    const recyclerViewContainer = ref<HTMLElement | null>(null)
    const canSeeDataCount = ref<number>(0)
    const showDataList = ref<any[]>([])
    const paddingTop = ref<number>(0)
    const containerHeight = ref<number>(0)
    const dataRange = ref<{ startIndex: number, endIndex: number }>({
      startIndex: 0,
      endIndex: 0
    })
    const isScroll = false
    let isComplete = false

    const handleScroll = () => {
      if (isScroll) return
      window.requestAnimationFrame(() => setDataRange()()()())
    }

    const setDataRange = () => {
      dataRange.value.startIndex = recyclerViewContainer.value ? ~~(recyclerViewContainer?.value?.scrollTop / itemHeight?.value) - (dataBuffer?.value / 2) : 0
      dataRange.value.startIndex = Math.max(dataRange.value.startIndex, 0)
      dataRange.value.endIndex = dataRange.value.startIndex + canSeeDataCount.value + dataBuffer?.value
      dataRange.value.endIndex = Math.min(data.value.length - 1, dataRange.value.endIndex)

      return () => getShowDataList()
    }

    const getShowDataList = () => {
      showDataList.value = data.value
        .slice(dataRange.value.startIndex, dataRange.value.endIndex)
        .map((item, index) => {
          return {
            ...item,
            __index__: index + dataRange.value.startIndex
          }
        })

      return () => setScrollContainerPadding()
    }

    const setIsScrollStatus = () => {
      // isScroll = !isScroll
      return onPageEnd()
    }
    const setScrollContainerPadding = () => {
      paddingTop.value = dataRange.value.startIndex * itemHeight.value
      return () => setIsScrollStatus()
    }
    const setScrollContainerHeight = () => (containerHeight.value = data.value.length * itemHeight.value)
    const onPageEnd = () => {
      if (
        (dataRange.value.startIndex + canSeeDataCount.value + dataBuffer?.value / 2 > data.value.length - 1) && !isComplete
      ) {
        setIsComplete()
        return onComplete?.value?.()
      }
    }
    const setCanSeeDataCount = () => {
      canSeeDataCount.value = recyclerViewContainer.value ? Math.ceil(recyclerViewContainer.value.clientHeight / itemHeight.value) + 1 : 0
    }
    const setIsComplete = () => {
      console.log('isComplete', isComplete)
      return (isComplete = !isComplete)
    }

    watch(props, () => {
      setScrollContainerHeight()
      isComplete = false
    })

    onMounted(() => {
      setScrollContainerHeight()
      setCanSeeDataCount()
      return setDataRange()()()
    })

    return {
      handleScroll,
      dataRange,
      paddingTop,
      containerHeight,
      showDataList,
      recyclerViewContainer
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.recycler-view-container{
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  overflow-y: scroll;
}
.recycler-view-scroll-list{
  box-sizing: border-box;
}
.recycler-view-scroll-item{
  overflow: hidden;
}
.recycler-view-loading{
  text-align: center;
  color: #ccc;
}
</style>
