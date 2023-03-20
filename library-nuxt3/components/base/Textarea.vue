<template>
  <div class="textarea-wrap">
    <label v-if="label !== ''" :for="id">{{label}}</label>
    <textarea
      :id="id"
      class="textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :rows="rows"
      @input="handleOnUpdate"
    />
    <span v-if="maxByte > 0" class="text-option">{{$getFormatThousandsSeparators(countByte)}}/{{$getFormatThousandsSeparators(maxByte)}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { calcByte } from '@/plugins/check/check-byte'

export default defineComponent({
  name: 'BaseTextarea',
  props: {
    modelValue : {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    rows:{
      type: Number,
      default: 8
    },
    maxByte: {
      type: Number,
      default: -1
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const countByte = computed(()=> calcByte(String(props.modelValue)))

    const handleOnUpdate = (e: any) => {
      if (props.maxByte !== -1 && countByte.value >= props.maxByte && e.target.value > props.modelValue) {
        e.target.value = props.modelValue
        return
      }
      emit('update:modelValue', e.target.value)
    }

    return { handleOnUpdate, countByte }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.textarea-wrap {
  position: relative;
  padding: 15px;
  border: 1px solid $color-bg-custom-3;
  border-radius: 8px;
   background-color: $color-white;

  .textarea {
    width:100%;
    @include text-style($text-body-14-regular);
    background-color: $color-white;
    resize: none;


    &::placeholder {
      color: $color-text-3
    }
  }

  .text-option {
    display: flex;
    justify-content: flex-end;
    @include text-style($text-body-12-regular);
    color: $color-text-3;
  }
}

</style>
