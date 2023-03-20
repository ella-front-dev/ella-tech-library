<template>
  <button type="button" class="btn-simple">
    <span class="label">{{label}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtonsSimpleText',
  props: {
    label: {
      required: true,
      type: String
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.btn-simple {
  display: inline-flex;

  > .label {
    @include text-style($text-body-11-regular);
    color: $color-text-3;
  }
}
</style>
