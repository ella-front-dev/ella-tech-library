<template>
  <div
    ref="target"
    :class="['drop-down-wrap', { on }, directionClass]"
  >
    <div v-show="type === 'select'" class="drop-down" @click="handleOnToggle">
      <span class="select-text">{{activeLabel || $props.placeholder}}</span>
      <span class="icon"><i class="material-icons-outlined">arrow_drop_down</i></span>
    </div>

    <div v-show="type === 'button'" class="drop-down-action" @click="handleOnToggle">
      <slot name="action" />
    </div>

    <div class="drop-down-menu-wrap">
      <div class="drop-down-menu">
        <DropDownMenuItem
          v-for="(item, index) in $props.menus"
          :key="index"
          :item="item"
          :active-value="$props.activeValue"
          @update="handleOnUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import DropDownMenuItem, { DropDownMenuItemProps } from '@/components/base/drop-down/DropDownMenuItem.vue'

export default defineComponent({
  name: 'BaseDropDown',
  components: {
    DropDownMenuItem
  },
  props: {
    direction: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom'
    },
    placeholder: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [String, Number],
      default: ''
    },
    menus: {
      required: true,
      type: Array as PropType<DropDownMenuItemProps[]>
    },
    type: {
      type: String as PropType<'select' | 'button'>,
      default: 'select'
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const target = ref(null)
    const on = ref<boolean>(false)
    const handleOnUpdate = (value: string | number) => {
      emit('update', value)
      on.value = false
    }
    const activeLabel = computed(() =>
      props.menus.find(item => item.value === props.activeValue)?.label || ''
    )
    const directionClass = computed(() => `drop-down-${props.direction}`)
    const handleOnToggle = () => {
      on.value = !on.value
    }

    onClickOutside(target, () => {
      on.value = false
    })

    return { on, target, activeLabel, handleOnToggle, handleOnUpdate, directionClass }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.drop-down-wrap {
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: auto;

  &.drop-down-bottom {
    .drop-down-menu-wrap {
      top: 100%;
      padding-top: 8px;
      transform: translateY(24px);
    }
  }

  &.drop-down-top {
    .drop-down-menu-wrap {
      bottom: 100%;
      padding-bottom: 8px;
      transform: translateY(calc(100% + 24px * -1));
    }
  }

  &:hover {
    .drop-down {
      border-color: $color-primary;
    }
  }

  &:active {
    .drop-down {
      color: $color-black-90p;
      border-color: $color-primary;
    }
  }

  &.on {
    .drop-down {
      color: $color-black-90p;
      border-color: $color-primary;

      > .icon {
        transform: rotate(180deg);
      }
    }

    .drop-down-menu-wrap {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }

  .drop-down {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    font-size: 12px;
    color: $color-99;
    border-radius: 5px;
    border: 1px solid $color-ed;
    cursor: pointer;
    background-color: #ffffff;
    transition: all 0.2s;

    .select-text {
    }

    > .icon {
      font-size: 0;
      color: $color-a5;
      @include transition(transform .15s ease-in-out);

      > i {
        font-size: 20px;
      }
    }
  }

  .drop-down-menu-wrap {
    position: absolute;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0;
    @include transition(all .2s ease-in-out);
    pointer-events: none;
    z-index: $z-index-drop-down;

    .drop-down-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      max-height: 260px;
      padding: 4px 0;
      border: 1px solid $color-black-5p;
      border-radius: 5px;
      background-color: #ffffff;
    }
  }
}
</style>
