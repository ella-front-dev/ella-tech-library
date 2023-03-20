<template>
  <button :class="['tip-tap-menu-button', { on: isActive }]" type="button" :style="{color: color}">
    <span class="shade"></span>
    <BaseIcon :icon="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseIcon, { IconType } from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'BaseTipTapMenuBarButton',
  components: { BaseIcon },
  props: {
    icon: {
      required: true,
      type: Object as PropType<IconType>
    },
    isActive: {
      required: true,
      type: Boolean
    },
    color:{
      type: String,
      default: '#3F4354'
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.tip-tap-menu-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  &:active {
    .shade {
      opacity: 1;
      width: 100%;
      height: 100%;
      background-color: $color-black-5p;
    }

    .icon-container {
      .icon,
      .icon-overlap {
        color: $color-black;
      }
    }
  }
  &.on {
    .shade {
      opacity: 1;
      width: 100%;
      height: 100%;
      background-color: $color-black-5p;
    }
    .icon-container {
      .icon,
      .icon-overlap {
        color: $color-white;
      }
    }
  }

  .shade {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    background-color: $color-black-5p;
    opacity: 0;
    @include transition(all .1s)
  }

  .icon-container {
    position: relative;
    font-size: 0;
    z-index: 1;

    .icon {
      font-size: 14px;
      color: $color-black-60p;
      @include transition(all .15s);
    }

    .icon-overlap {
      position: absolute;
      right: -6px;
      bottom: -1px;
      font-size: 10px;
      color: $color-black-60p;
      transition: all .2s;
    }
  }
}
</style>
