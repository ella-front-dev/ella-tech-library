<template>
  <div
    :class="[
      'textarea-wrap',
      {
        'no-resize': noResize,
        success: validate.isSuccess,
        fail: validate.isFail,
      },
    ]"
  >
    <label v-if="label" :for="id" class="textarea-label">{{ label }}</label>
    <div class="textarea-box">
      <textarea
        :id="id"
        class="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        @input="handleOnUpdate"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
        @keyup="$emit('on-keyup')"
      />
      <span v-if="maxByte > 0" class="text-option">
        {{ $getFormatThousandsSeparators(countByte) }}/{{
          $getFormatThousandsSeparators(maxByte)
        }}
      </span>
    </div>
    <div class="validate" v-if="validate.status">
      <p class="text" v-if="validate.isSuccess">
        {{ validate.successMessage }}
      </p>
      <p class="text" v-if="validate.isFail">
        {{ validate.failMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { calcByte } from '@/plugins/check/check-byte'

interface validateType {
  status: boolean
  isSuccess?: boolean
  successMessage?: string
  isFail?: boolean
  failMessage?: string
}

const validateDefault = {
  status: false,
  isSuccess: false,
  successMessage: '',
  isFail: false,
  failMessage: '',
}

export default defineComponent({
  name: 'BaseTextarea',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 8,
    },
    maxByte: {
      type: Number,
      default: -1,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: Object as PropType<validateType>,
      default: () => validateDefault,
    },
  },
  emits: ['update:modelValue', 'on-focus', 'on-blur', 'on-keyup'],
  setup(props, { emit }) {
    const countByte = computed(() => calcByte(String(props.modelValue)))

    const handleOnUpdate = (e: any) => {
      if (
        props.maxByte !== -1 &&
        countByte.value >= props.maxByte &&
        e.target.value > props.modelValue
      ) {
        e.target.value = props.modelValue
        return
      }
      emit('update:modelValue', e.target.value)
    }

    return { handleOnUpdate, countByte }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.textarea-wrap {
  .textarea-box {
    position: relative;
    padding: 15px;
    border: 1px solid $color-bg-custom-3;
    border-radius: 8px;
    background-color: $color-white;

    .textarea {
      width: 100%;
      @include text-style($text-body-14-regular);
      background-color: $color-white;

      &::placeholder {
        color: $color-text-3;
      }
    }

    .text-option {
      display: flex;
      justify-content: flex-end;
      @include text-style($text-body-12-regular);
      color: $color-text-3;
    }
  }

  &.no-resize {
    .textarea {
      resize: none;
    }
  }

  &.success {
    .input-box {
      padding: 0 20px;
      background-color: $color-bg-1;
      border: 1px solid $color-primary-blue;

      > input {
        color: $color-text-3;
      }
    }
    .validate {
      .text {
        @include text-style($text-body-11-regular);
        color: $color-primary-blue;
      }
    }
  }

  // validate fail style
  &.fail {
    .input-box {
      padding: 0 20px;
      background-color: $color-bg-1;
      border: 1px solid $color-primary-red;

      > input {
        color: $color-text-3;
      }
    }
    .validate {
      .text {
        @include text-style($text-body-11-regular);
        color: $color-primary-red;
      }
    }
  }
}
</style>
