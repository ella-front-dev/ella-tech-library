<template>
  <div class="input-group">
    <label :for="id">{{label}}</label>
    <div class="input-box">
      <input
        :id="id"
        ref="input"
        :type="type"
        :value="modelValue"
        :class="['input', `${$props.class}`]"
        :placeholder="placeholder"
        @input="handleOnUpdate"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
      />
      <div class="input-tools">
        <BaseButtonsIcon
          :icon="{ type: 'outline', name: 'clear' }"
          :size="14"
          :class="['btn-clear', { on: modelValue }]"
          @click="handleOnClear"
        />

        <slot name="tools"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseButtonsIcon from '@/components/base/buttons/Icon.vue'

export default defineComponent({
  name: 'BaseInput',
  components: {
    BaseButtonsIcon
  },
  props: {
    modelValue: {
      required: true,
      type: [String, Number]
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    class: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: [
    'update:modelValue',
    'on-focus',
    'on-blur'
  ],
  setup(_props, { emit }){
    const input = ref<HTMLElement | null>(null)
    const handleOnUpdate = (e:any) => {
      emit('update:modelValue', e.target.value)
    }

    const handleOnClear = () => {
      emit('update:modelValue', '')
    }

    return { handleOnUpdate, handleOnClear, input }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-box {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: $color-bg-1;

  &::placeholder {
    color: $color-text-3;
  }

  > input {
    @include text-style($text-body-14-regular);
    color: $color-text-4;
    padding: 0;
    flex-grow: 1;
    background-color: transparent;
  }
}

.input-tools {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 6px;

  .btn-clear {
    transform: scale(0);
    pointer-events: none;
    @include transition(transform .15s);

    &.on {
      transform: scale(1);
      pointer-events: auto;
    }
  }
}
</style>
