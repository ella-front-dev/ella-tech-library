<template>
  <button
    :class="['drop-down-menu-item', { on }]"
    type="button"
    @click="handleOnChangeValue"
  >
    <span class="label">{{$props.item.label}}</span>
    <!-- <BaseIcon  :icon="{type:'outline', name: 'check'}" /> -->
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
// import BaseIcon from '@/components/base/Icon.vue'

export interface DropDownMenuItemProps {
  label: string,
  value: string
}

export default defineComponent({
  name: 'DropDownMenuItem',
  // components: {
  //   BaseIcon
  // },
  props: {
    activeValue: {
      type: [String, Number],
      default: ''
    },
    item: {
      required: true,
      type: Object as PropType<DropDownMenuItemProps>
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const on = computed(() => props.activeValue === props.item.value)
    const handleOnChangeValue = () => {
      emit('update', props.item.value)
    }

    return { on, handleOnChangeValue }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.drop-down-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  min-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: $color-black-60p;
  padding: 6px 12px;
  @include transition(all .15s ease-in-out);

  @media (hover: hover) {
  &:hover {
    background-color:$color-bg-1;
  }
      }

  &.on {
    background-color:$color-bg-1;
    
    > .label {
      color: $color-black-90p;
    }

    > i {
      opacity: 1;
    }
  }

  > .label {
    font-size: 14px;
    text-align: left;
  }

  > i {
    color: $color-black-60p;
    opacity: 0;
  }
}
</style>