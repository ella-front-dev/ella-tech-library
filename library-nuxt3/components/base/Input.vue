<template>
  <div
    :class="[
      'input-group',
      themeClass,
      {
        disabled,
        success: validate.isSuccess,
        fail: validate.isFail,
      },
    ]"
  >
    <label :for="id" class="input-label">{{ label }}</label>
    <div class="input-box">
      <input
        :id="id !== '' ? id : undefined"
        ref="input"
        :type="type"
        :name="inputName !== '' ? inputName : undefined"
        :value="modelValue"
        :class="['input', `${$props.class}`]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="inputReadonly"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        size="14"
        @input="handleOnUpdate"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
        @keyup="$emit('on-keyup')"
        @keydown.enter="$emit('on-keydown')"
      />
      <div class="input-tools" v-if="isOption">
        <BaseButtonsIcon
          :icon="{ type: 'outline', name: 'clear' }"
          :size="14"
          :class="['btn-clear', { on: modelValue }]"
          @click="handleOnClear"
        />
        <em v-if="maxByte > 0" class="count-box">
          ({{ countByte }}/{{ maxByte }})
        </em>
        <slot name="tools" />
      </div>
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
import { defineComponent, ref, PropType, computed } from 'vue'
import { calcByte } from '@/plugins/check/check-byte'
import BaseButtonsIcon from '@/components/base/buttons/Icon.vue'

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
  name: 'BaseInput',
  components: {
    BaseButtonsIcon,
  },
  props: {
    modelValue: {
      required: true,
      type: [String, Number],
    },
    inputName: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    class: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputReadonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    theme: {
      type: String as PropType<'default' | 'search'>,
      default: 'default',
    },
    maxByte: {
      type: Number,
      default: -1,
    },
    isOption: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: Object as PropType<validateType>,
      default: () => validateDefault,
    },
  },
  emits: ['update:modelValue', 'on-focus', 'on-blur', 'on-keydown', 'on-keyup'],
  setup(props, { emit }) {
    const input = ref<HTMLElement | null>(null)
    const themeClass = computed(() => `theme-${props.theme}`)
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

    const handleOnClear = () => {
      emit('update:modelValue', '')
    }

    return { handleOnUpdate, handleOnClear, input, themeClass, countByte }
  },
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

  .input-label {
    text-align: left;
    @include text-style($text-body-14-bold);
    color: $color-text-4;
  }

  .input-box {
    display: flex;
    gap: 10px;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border-radius: 8px;
    border: 1px solid $color-bg-custom-2;

    > input {
      @include text-style($text-body-14-regular);
      color: $color-text-2;
      padding: 0;
      flex-grow: 1;
      background-color: transparent;

      &::placeholder {
        color: $color-text-3;
      }
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
      @include transition(transform 0.15s);

      &.on {
        transform: scale(1);
        pointer-events: auto;
      }
    }

    .count-box {
      color: $color-text-3;
      @include text-style($text-body-12-regular);
    }
  }

  &.theme-search {
    .input-box {
      padding: 0 20px;
      background-color: $color-bg-1;
      border: 0;

      &::placeholder {
        color: $color-text-3;
      }

      > input {
        color: $color-text-4;
      }
    }
  }

  // input disabled style
  &.disabled {
    .input-box {
      padding: 0 20px;
      background-color: $color-bg-1;
      border: 1px $color-text-3;

      > input {
        color: $color-text-3;
      }
    }
  }

  // validate success style
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
