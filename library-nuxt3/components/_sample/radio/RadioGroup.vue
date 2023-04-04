<template>
  <div :class="['radio-group', direction==='vertical'? 'vertical': '' ]">
    <BaseRadio
      v-for="(item, index) in checkData"
      :key="index"
      :is-check="item.value"
      :label="item.label"
      :direction="item.direction"
      @click="handleOnChange(item.name)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import  BaseRadio from '@/components/base/radio/index.vue'

type CheckDataType = {
  name: String,
  value: Boolean,
  label: String,
  direction: String
}

export default defineComponent({
  name: 'BaseCheckboxGroup',
  components: {
    BaseRadio
  },
  props: {
    current:{
      required: true,
      type: String
    },
    checkData: {
      required: true,
      type: Array as PropType<CheckDataType[]>
    },
    direction: {
      type: String,
      default: 'horizon'
    }
  },
  setup(props, { emit }) {
    
    const handleOnChange = (name:string) => {
      emit('handleOnChangeRadio', name )
    }

    return { handleOnChange }
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