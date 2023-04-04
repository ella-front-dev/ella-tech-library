<template>
  <button
    type="button"
    :class="[
      prefix,
      sizeClass,
      fullWidthClass,
      colorClass,
      iconPositionClass,
      cornerClass,
      fixWidthClass
    ]"
    :disabled="$props.disabled"
    :style="{ width: $props.width > 0 ? `${$props.width}px` : 'auto' }"
  >
    <span v-if="$props.icon && $props.iconPosition === 'left'" class="icon">
      <BaseIcon :icon="icon" />
    </span>

    <span v-if="$props.label" class="label">
      <span>{{ $props.label }}</span>
      <span v-if="$props.labelBadge" class="label-badge">{{$props.labelBadge}}</span>
    </span>

    <span v-if="$props.icon && $props.iconPosition === 'right'" class="icon">
      <BaseIcon :icon="icon" />
    </span>
  </button>
</template>


<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import BaseIcon, { IconType } from '@/components/base/Icon.vue'

type IconPosition = 'left' | 'right'
type Theme =
    | 'primary-red'
    | 'primary-red-light'
    | 'primary-yellow'
    | 'primary-blue'
    | 'secondary-gray'
    | 'transparent'
type Corner = 'round' | 'filet' | 'angle'

export default defineComponent({
  name: 'BaseButtonText',
  components: {
    BaseIcon
  },
  props: {
    size: {
      type: Number as PropType<20 | 40>,
      default: () => 40
    },
    icon: {
      type: Object as PropType<IconType>,
      default: null
    },
    iconPosition: {
      type: String as PropType<IconPosition>,
      default: 'left'
    },
    theme: {
      type: String as PropType<Theme>,
      default: 'primary'
    },
    corner: {
      type: String as PropType<Corner>,
      default: 'filet'
    },
    label: {
      type: [String, Number],
      default: ''
    },
    labelBadge: {
      type: [String, Number],
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    badgeLabel: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const prefix = 'btn'
    const sizeClass = computed<string>(() => `${prefix}-${props.size}`)
    const fullWidthClass = props.fullWidth ? `${prefix}-full` : ''
    const colorClass = computed<string>(() => `${prefix}-${props.theme}`)
    const iconPositionClass = props.icon && props.iconPosition ? `${prefix}-icon-${props.iconPosition}` : ''
    const cornerClass = `${prefix}-${props.corner.toLowerCase()}`
    const fixWidthClass = props.width > 0 ? `${prefix}-fix-width` : ''

    return {
      props,
      prefix,
      sizeClass,
      fullWidthClass,
      colorClass,
      iconPositionClass,
      cornerClass,
      fixWidthClass
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/functions.scss';

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  gap: 4px;
  background-color: transparent;
  padding: 0 22px;
  font-size: 0;
  border: 0 solid transparent;
  line-height: 44px;
  cursor: pointer;
  @include transition(
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out
  );
  overflow: hidden;
  color: $color-neutral-dark-1;

  > .icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size: 0;

    > i {
      position: relative;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-size: 24px;
      font-size: 24px;
      vertical-align: middle;

      .badge {
        position: absolute;
        top: - $base-unit * 1.5;
        right: - $base-unit * 1.5;

        &.badge-dot {
          top: calc($base-unit / 2);
          left: 100%;
        }
      }
    }
  }

  > .label {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    .label-badge {
      position: absolute;
      display: flex;
      align-items: center;
      top: 50%;
      left: 100%;
      height: $base-unit * 5;
      padding: 0 $base-unit * 2;
      border-radius: $base-unit * 2.5;
      transform: translateY(-50%);
      margin-left: $base-unit;
      white-space: nowrap;
      @include text-style($text-body-14-regular);

      color: $color-white;
      background-color: $color-neutral-dark-1;
    }
  }

  //////////////////////////////////////////////////////////////
  // color style ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  &.btn-primary-red {
    background-color: $color-secondary-red-custom-1;
    color: $color-bg-3;

    @media (hover: hover) {
      &:hover {
        background-color: $color-primary-red;
      }
    }

    &:active {
      background-color: $color-secondary-red-dark-80;
    }
  }

  &.btn-primary-red-light {
    background-color: $color-secondary-red-light-70;
    color: $color-bg-3;

    @media (hover: hover) {
      &:hover {
        background-color: $color-secondary-red-light-90;
      }
    }

    &:active {
      background-color: $color-secondary-red-dark-90;
    }
  }

  &.btn-primary-yellow {
    background-color: $color-primary-yellow;
    color: $color-bg-3;

    @media (hover: hover) {
      &:hover {
        background-color: $color-secondary-yellow-dark-90;
      }
    }

    &:active {
      background-color: $color-secondary-yellow-dark-80;
    }
  }

  &.btn-primary-blue {
    background-color: $color-primary-blue;
    color: $color-bg-3;

    @media (hover: hover) {
      &:hover {
        background-color: $color-secondary-blue-dark-80;
      }
    }

    &:active {
      background-color: $color-secondary-blue-dark-60;
    }
  }

  &.btn-secondary-gray {
    background-color: $color-bg-2;
    color: $color-text-2;

    @media (hover: hover) {
      &:hover {
        background-color: $color-bg-custom-2;
      }
    }

    &:active {
      background-color: $color-bg-custom-3;
    }
  }

  &.btn-transparent {
    background-color: transparent;
    color: $color-text-3;

    @media (hover: hover) {
      &:hover {
        color: $color-text-2;
      }
    }

    &:active {
      color: $color-dark-2;
    }
  }

  //////////////////////////////////////////////////////////////
  // full width style //////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  &.btn-full {
    display: block;
    width: 100% !important;

    > .icon {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
    }
  }

  //////////////////////////////////////////////////////////////
  // padding style for icon position ///////////////////////////
  //////////////////////////////////////////////////////////////
  &.btn-icon {
    &-left {
      padding-left: 10px;

      .icon {
        margin-right: 10px;
      }
    }

    &-right {
      padding-right: 10px;

      .icon {
        margin-left: 10px;
      }
    }
  }

  //////////////////////////////////////////////////////////////
  // corner style //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  &.btn-round {
    border-radius: 22px;
  }

  &.btn-filet {
    border-radius: 7px;
  }

  &.btn-angle {
    border-radius: 0;
  }

  //////////////////////////////////////////////////////////////
  // min style /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  &.btn-min {
    padding: 0;

    > .icon {
      margin: 0;
    }
  }

  //////////////////////////////////////////////////////////////
  // Size style ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  @mixin btn-size-base ($height) {
    line-height: $height;
    padding: 0 calc($height / 2);

    &.btn-fix-width {
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
  @mixin btn-icon-position-padding ($padding) {
    &.btn-icon {
      &-left {
        padding-left: $padding;

        .icon {
          margin-right: $padding;
        }
      }

      &-right {
        padding-right: $padding;

        .icon {
          margin-left: $padding;
        }
      }
    }
  }
  @mixin btn-full ($btn-padding, $icon-position) {
    &.btn-full {
      padding: 0 $btn-padding;

      > .icon {
        margin: 0;
        left: auto;
        right: auto;
      }
      &.btn-icon-left > .icon { left: $icon-position; }
      &.btn-icon-right > .icon { right: $icon-position; }
    }
  }
  @mixin btn-min {
    &.btn-min {
      padding: 0;

      > .icon {
        margin: 0;
      }
    }
  }

  &.btn-40 {
    @include btn-size-base(40px);
    @include text-style($text-body-14-bold);
    @include btn-icon-position-padding(10px);
    @include btn-full(22px, 10px);
    @include btn-min();
  }
}
</style>
