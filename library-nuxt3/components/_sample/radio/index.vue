<template>
  <div :class="['radio-box', `dir-${direction}`]">
    <BaseIcon
      :icon="{type: 'outline', name: isCheck ? 'checkbox-check' : 'checkbox-uncheck' }"
    />
    <span class="label">{{ label }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseIcon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'BaseRadio',
  components: {
    BaseIcon
  },
  props: {
    isCheck: {
      required: false,
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'row' 
    }
  },
  setup() {
  }
})
</script>

<style lang="scss">
  .radio-box {
    display: flex;
    align-items: center;

  &.dir-row {
    flex-direction: row;
  }
  &.dir-column {
    flex-direction: column;
  } 
  &.dir-row-reverse {
    flex-direction: row-reverse;
  } 
  &.dir-column-reverse {
    flex-direction: column-reverse;
  } 

  > .label {
      margin-left: 4px;
    }

  }
  
  

</style>