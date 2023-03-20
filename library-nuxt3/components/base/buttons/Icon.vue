<template>
  <button
    ref="btnIcon"
    type="button"
    :class="['btn-icon', { on }, themeClass, sizeClass]"
  >
    <span class="shade" />

    <span class="icon-wrap">
      <span :class="['bullet', { on: bullet }]"></span>
      <BaseIcon :icon="icon" :size="iconSize" />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import BaseIcon, { IconType } from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'BaseButtonsIcon',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      required: true,
      type: Object as PropType<IconType>
    },
    theme: {
      type: String as PropType<'square' | 'square-bg' | 'circle' | 'transparent'>,
      default: 'transparent'
    },
    size: {
      type: Number as PropType<14 | 20 | 24 | 40>,
      default: 20
    },
    on: {
      type: Boolean,
      default: false
    },
    bullet: {
      type: Boolean,
      default: false
    },
    fillIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const btnIcon = ref<HTMLElement | null>(null)
    const themeClass = computed(() => `btn-${props.theme}`)
    const sizeClass = computed(() => `btn-${props.size}`)
    const iconSize = computed(() => {
      if (props.fillIcon) {
        return props.size
      }

      switch (props.theme) {
        case 'square':
        case 'square-bg':
        case 'circle':
          return (props.size / 2)
        case 'transparent':
        default:
          return props.size
      }
    })

    return { btnIcon, themeClass, sizeClass, iconSize }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.btn-icon {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  color: inherit;
  @include transition(all .15s ease-in-out);

  @media (hover: hover) {
    &:hover {
      color: $color-text-3;
    }
  }

  &:active {
    color: $color-text-3;

    .shade {
      opacity: 1;
    }
  }

  &.btn {
    // size
    &-14 {
      width: 14px;
      height: 14px;

      .shade {
        width: 20px;
        height: 20px;
        border-radius: 3px;
      }
    }

    &-20 {
      width: 20px;
      height: 20px;

      .shade {
        width: 26px;
        height: 26px;
        border-radius: 4px;
      }
    }

    &-24 {
      width: 20px;
      height: 20px;

      .shade {
        width: 24px;
        height: 24px;
        border-radius: 4px;
      }
    }


    &-40 {
      width: 40px;
      height: 40px;

      .shade {
        width: 100%;
        height: 100%;
        border-radius: 7px;
      }
    }

    // theme
    &-square {
      color: $color-text-5;
      background-color: transparent;

      .shade {
        display: none;
      }

      @media (hover: hover) {
        &:hover {
          color: $color-bg-3;
          background-color: $color-secondary-red-custom-1;
        }
      }

      &:active {
        color: $color-bg-3;
        background-color: $color-primary-red;
      }

      &.on {
        color: $color-bg-3;
        background-color: $color-secondary-red-custom-1;
      }
    }

    &-square-bg {
      color: $color-text-4;
      background-color: $color-bg-1;

      .shade {
        display: none;
      }

      @media (hover: hover) {
        &:hover {
          color: $color-text-7;
          background-color: $color-bg-custom-5;
        }
      }

      &:active {
        color: $color-text-8;
        background-color: $color-bg-custom-6;
      }

      &.on {
        color: $color-text-6;
      }
    }

    &-circle {
      .shade {
        border-radius: 50%;
      }
    }

    &-transparent {
      .shade {
        border-radius: 50%;
      }
    }
  }

  &.floating {
    background-color: $color-white;
    border-radius: 100%;
    box-shadow: 0 6px 12px rgb(0 0 0 / 10%);
    width: 38px;
    height: 38px;

    .icon { font-size: 20px; }
  }

  &.fill-icon {
    &.btn-14 {
      .icon { font-size: 14px; }
    }
    &.btn-20 {
      .icon { font-size: 20px; }
    }
    &.btn-40 {
      .icon { font-size: 40px; }
    }
  }

  .shade {
    position: absolute;
    opacity: 0;
    background-color: $color-black-5p;
    @include transition(opacity .15s);
    pointer-events: none;
    z-index: 1;
  }

  .icon-wrap {
    position: relative;
    display: block;
    font-size: 0;

    .bullet {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      width: 7px;
      height: 7px;
      background-color: $color-secondary-red-light-80;
      border: 1px solid $color-bg-3;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      @include transition(opacity .2s);

      &.on {
        opacity: 1;
      }
    }
  }
}
</style>
