<template>
  <div class="recycler-view-wrap">
    <!-- <div class="scroll-guard" :style="{ opacity: scrollGuardOpacity, paddingBottom: `${boxBottomPadding}px` }"></div>
    <DynamicScroller
      ref="recyclerViewRef"
      :items="items"
      :min-item-size="minItemSize"
      :emit-update="true"
      :key-field="keyField"
      :prerender="prerender"
      class="scroller"
      :style="{ paddingBottom: `${boxBottomPadding}px` }"
      @update="handleOnUpdate"
    >
      <template #after>
        <BaseLoadingIndicator
          v-if="!noMoreLoad"
          :size="48"
          :bg-bright="'light'"
          :fill="false"
        />
      </template>

      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="getSizeDependencies(item)"
          :data-index="index"
          :data-active="active"
        >
          <div class="item-wrap" :style="{ paddingBottom: `${gap}px` }">
            <slot name="item" :item="item" :index="index" />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onUnmounted, computed } from 'vue'
// import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import BaseLoadingIndicator from '@/components/base/LoadingIndicator.vue'

export default defineComponent({
  name: 'BaseRecyclerViewNew',
  components: {
    // DynamicScroller,
    // DynamicScrollerItem,
    BaseLoadingIndicator
  },
  props: {
    items: {
      required: true,
      type: Array as PropType<Object[]>
    },
    noMoreLoad: {
      required: true,
      type: Boolean
    },
    keyField: {
      required: true,
      type: String
    },
    sizeDependencies: {
      required: true,
      type: Array as PropType<string[]>
    },
    minItemSize: {
      type: Number,
      default: 30
    },
    prerender: {
      type: Number,
      default: 20
    },
    gap: {
      type: Number,
      default: 20
    },
    boxBottomPadding:{
      type: Number,
      default: 20
    }
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const scroller = ref<Element | null>(null)
    const scrollPosition = ref(0)
    const scrollGuardOpacity = computed(() => (scrollPosition.value > 50 ? 50 : scrollPosition.value) * 2 / 100)
    const updateParts = ref({
      viewStartIdx: 0,
      viewEndIdx: 0,
      visibleStartIdx: 0,
      visibleEndIdx: 0
    })

    onMounted(() => {
      scroller.value = document.querySelector('.recycler-view-wrap .scroller')
      scroller.value?.addEventListener('scroll', () => handleOnChangeScroll())
    })

    onUnmounted(() => {
      scroller.value?.removeEventListener('scroll', () => handleOnChangeScroll())
    })

    const getSizeDependencies = (item: { [key in string]: any }) => {
      return props.sizeDependencies.map(dependency => item[dependency])
    }

    const handleOnUpdate = (viewStartIndex: number, viewEndIndex: number, visibleStartIndex: number, visibleEndIndex: number) => {
      updateParts.value = {
        viewStartIdx: viewStartIndex,
        viewEndIdx: viewEndIndex,
        visibleStartIdx: visibleStartIndex,
        visibleEndIdx: visibleEndIndex
      }
    }

    // 스크롤 그라데이션 처리 및 스크롤 포지션이 버텀 찍는지 확인
    const handleOnChangeScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scroller.value!
      scrollPosition.value = scrollTop || 0

      if (!props.noMoreLoad && Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
        emit('loadMore')
      }
    }

    return { getSizeDependencies, handleOnUpdate, scrollGuardOpacity }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.recycler-view-wrap {
  position: relative;
  flex-grow: 1;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .scroll-guard {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(0deg, hex-to-rgba($color-bg-2, 0) 6.56%, $color-bg-2 72.13%);
    z-index: 3;
    pointer-events: none;
  }

  .scroller {
    height: 100%;

    :deep(.vue-recycle-scroller__item-view) {
      &:active,
      &:focus {
        z-index: 2;
      }
    }
  }

  .item-wrap {
    padding-bottom: 20px;
  }
}
</style>
