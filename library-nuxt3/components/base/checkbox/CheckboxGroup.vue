<template>
  <div :class="['checkbox-group', direction==='vertical'? 'vertical': '' ]">
    <BaseCheckbox
      v-for="(item, index) in checkData"
      :key="index"
      :is-check="item.value"
      :label="item.label"
      :direction="item.direction"
      @click="item.value = !item.value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import  BaseCheckbox from '@/components/base/checkbox/index.vue'

type CheckDataType = {
  value: Boolean,
  label: String,
  direction: String
}

export default defineComponent({
  name: 'BaseCheckboxGroup',
  components: {
    BaseCheckbox
  },
  props: {
    checkData: {
      required: true,
      type: Array as PropType<CheckDataType[]>
    },
    direction: {
      type: String,
      default: 'horizon'
    }
  },
  setup() {
    
  }
})
</script>


<style lang="scss">
  .checkbox-group {
    display: flex;
    
    &.vertical {
      flex-direction: column;
    }
  

  }
</style>