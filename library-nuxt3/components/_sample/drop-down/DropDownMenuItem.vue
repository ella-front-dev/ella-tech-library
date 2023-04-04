<template>
  <button
    :class="['drop-down-menu-item', { on }]"
    type="button"
    @click="handleOnChangeValue"
  >
    <span class="label">{{$props.item.label}}</span>
    <i class="material-icons-outlined">check</i>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export interface DropDownMenuItemProps {
  label: string,
  value: string
}

export default defineComponent({
  name: 'DropDownMenuItem',
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

  &:hover {
    background-color: $color-black-3p;
  }

  &.on {
    > .label {
      color: $color-black-90p;
    }

    > i {
      opacity: 1;
    }
  }

  > .label {
    font-size: 12px;
    text-align: left;
  }

  > i {
    color: $color-black-60p;
    opacity: 0;
  }
}
</style>