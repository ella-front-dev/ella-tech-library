<template>
  <div :class="['switch-wrap', { on: modelValue }]" @click="handleOnUpdateValue">
    <span class="rail" />
    <span class="button"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseSwitch',
  props: {
    modelValue: {
      required: true,
      type: Boolean
    }
  },
  emits: {
    update: (_value: boolean) => true
  },
  setup(props, { emit }) {
    const handleOnUpdateValue = () => {
      emit('update', !props.modelValue)
    }

    return { handleOnUpdateValue }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.switch-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 16px;
  cursor: pointer;

  &.on {
    > .rail {
      background-color: $color-secondary-red-light-30;
    }

    > .button {
      left: 14px;
      background-color: $color-primary-red;
    }
  }

  > .rail {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: $color-gray-1;
    //transition: all 2s ease-in-out;
    @include transition(background-color 0.15s ease-in-out);
  }

  > .button {
    position: absolute;
    top: 50%;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: $color-text-3;
    box-shadow: 0 1px 4px 0 hex-to-rgba($color-black, .2);
    transform: translateY(-50%);
    //transition: all 2s ease-in-out;
    @include transition(
      background-color 0.15s ease-in-out,
      left 0.15s ease-in-out
    );
  }
}
</style>
