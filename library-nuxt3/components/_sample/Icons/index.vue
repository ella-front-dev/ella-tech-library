<template>
  <!-- <i :class="[icon, sizeClass, colorClass]">{{$props.icon}}</i> -->
  <span class="icon-container">
    <i 
      :class="['icon', 'material-icons-sharp', sizeClass]"
      :style="{color: color}"  
    >{{icon}}</i>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xlg'
type IconColor =  'black'|'grey'
export default defineComponent({
  name: 'BaseIcons',
  props: {
    icon: {
      required: true,
      type: String
    },
    size: {
      type: String as PropType<IconSize>,
      default: 'md'
    },
    color: {
      type: String as PropType<IconColor>,
      default: 'black'
    }
  },
  setup(props) {
    const sizeClass = computed(() => `size-${props.size}`)
    return { sizeClass }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
  /* icon size */
  .size-xs {font-size: 6px;}
  .size-sm {font-size: 12px;} 
  .size-md {font-size: 24px;} 
  .size-lg {font-size: 36px;}
  .size-xlg {font-size:48px;}
  /* icon color */
  .color-black {color: #000}
  .color-grey {color: #aaa}
</style>