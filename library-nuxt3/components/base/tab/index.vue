<template>
  <div class="tabs-container">
    <div ref="tabs" :class="['tabs', `theme-${theme}`, `size-${size}`]">
      <ClientOnly>
        <Swiper
          ref="swiper"
          class="swiper"
          :slides-per-view="'auto'"
          :breakpoints="swiperBreakpoint"
          @swiper="handleOnSetSwiper"
          @touch-move="() => setIndicator(false)"
          @touch-end="() => setIndicator(true)"
          @transition-end="() => setIndicator(true)"
        >
          <SwiperSlide
            v-for="item in tabValue"
            :key="item.id"
            :class="['tab', { on: currentTab.id === item.id }]"
          >
            <button
              type="button"
              class="tab-button"
              @click="() => handleOnTabClick(item)"
            >
              <span class="label">{{item.name}}</span>
            </button>
          </SwiperSlide>
        </Swiper>

        <span ref="indicator" class="indicator" />
      </ClientOnly>
    </div>
    <div v-if="currentTab.contentsComponent" class="tabs-content">
      <keep-alive>
        <component :is="currentTab.contentsComponent" />
      </keep-alive>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { SwiperOptions } from 'swiper/types'

export type TabData<T> = {
  id: T
  name: string,
  contentsComponent?: string
}

export default defineComponent({
  name: 'BaseTab',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    tabValue: {
      required: true,
      type: Array as PropType<TabData<string>[]>
    },
    theme: {
      type: String as PropType<'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange'>,
      default: 'red'
    },
    size: {
      type: Number as PropType<40 | 62>,
      default: 62
    }
  },
  emits: {
    onChangeTab: (_tab: TabData<string>) => true
  },
  setup(props, { emit }) {
    const tabs = ref<HTMLElement | null>(null)
    const swiper = ref<typeof Swiper | null>(null)
    const indicator = ref<HTMLElement | null>(null)
    const swiperBreakpoint = computed(() => (
      props.size === 62
        ? { 0: { spaceBetween: 20 }, 960: { spaceBetween: 50 } }
        : { 0: { spaceBetween: 20 } }
    ) as SwiperOptions['breakpoints'])
    const currentTab = ref<TabData<string>>(props.tabValue[0])

    // change: set indicator position
    watch(currentTab, async () => {
      await nextTick()
      setIndicator()
    })

    // mounted:resize: set indicator position
    onMounted(() => {
      window.addEventListener('resize', () => setIndicator())
    })

    // unmounted:resize: remove indicator position
    onUnmounted(() => {
      window.removeEventListener('resize', () => setIndicator())
    })

    // set indicator
    const setIndicator = (onTransition = true) => {
      if (!swiper.value || !tabs.value || !indicator.value) return

      const tabsRect = tabs.value!.getClientRects()[0]
      const tabRect = swiper.value!.el.querySelector('.tab.on .tab-button').getClientRects()[0]
      const offset = { left: tabRect.left - tabsRect.left }

      tabs.value!.classList[onTransition ? 'add' : 'remove']('on-transition')
      indicator.value!.style.left = `${offset.left}px`
      indicator.value!.style.width = `${tabRect.width}px`
    }

    // init swiper
    const handleOnSetSwiper = (evt: typeof Swiper) => {
      swiper.value = evt
      setIndicator()
    }

    // change tab on
    const handleOnTabClick = (tab: TabData<string>) => {
      currentTab.value = tab
      emit('onChangeTab', tab)
    }

    return { currentTab, swiperBreakpoint, tabs, indicator, handleOnSetSwiper, handleOnTabClick, setIndicator }
  }
})
</script>
<style lang="scss">
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';
.tabs-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .tabs {
    position: relative;
    display: flex;

    &.on-transition {
      .indicator {
        @include transition(
          left .2s ease-in-out,
          width .2s ease-in-out
        )
      }
    }

    &.theme {
      &-blue {
        .swiper .tab.on .tab-button > .label {
          color: $color-primary-blue;
        }

        .indicator { background-color: $color-primary-blue; }
      }

      &-red {
        .swiper .tab.on .tab-button > .label {
          color: $color-secondary-red-light-80;
        }

        .indicator { background-color: $color-secondary-red-light-80; }
      }

      &-green {
        .swiper .tab.on .tab-button > .label {
          color: $color-primary-green;
        }

        .indicator { background-color: $color-primary-green; }
      }

      &-yellow {
        .swiper .tab.on .tab-button > .label {
          color: $color-primary-yellow;
        }

        .indicator { background-color: $color-primary-yellow; }
      }

      &-orange {
        .swiper .tab.on .tab-button > .label {
          color: $color-primary-orange;
        }

        .indicator { background-color: $color-primary-orange; }
      }

      &-purple {
        .swiper .tab.on .tab-button > .label {
          color: $color-primary-purple;
        }

        .indicator { background-color: $color-primary-purple; }
      }
    }

    &.size {
      &-40 {
        height: 40px;
      }

      &-62 {
        height: 62px;
      }
    }

    .swiper {
      width: 100%;

      .tab {
        width: auto;

        &.on {
          .tab-button > .label {
            color: $color-secondary-red-light-80;
          }
        }

        .tab-button {
          display: inline-flex;
          align-items: center;
          height: 100%;

          &.on {
            > .label {
              color: $color-secondary-red-light-80;
            }
          }

          > .label {
            @include text-style($text-display-bold);
            color: $color-text-2;
            @include transition(color .2s ease-in-out);
          }
        }
      }
    }

    .indicator {
      position: absolute;
      top: calc(100% - 2px);
      height: 2px;
      background-color: $color-secondary-red-light-80;
    }
  }

  .tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
}
</style>
