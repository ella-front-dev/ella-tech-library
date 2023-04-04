<template>
  <div>
    BaseTab
    <ul class="tab-menu">
      <li 
        v-for="item in tabValue" 
        :key="item.id" 
        :class="currentTabId === item.id ? 'on': ''"
      >
        <button 
          type="button" 
          @click="currentTabId = item.id"
        >
          {{item.name}}
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <keep-alive>
        <component :is="currentTabId" />
      </keep-alive>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

export type tabData = {
  id: string,
  path: string
}

export default defineComponent({
  name: 'BaseTab',
  props: {
    tabValue :{
      required: true,
      type: Array as PropType<tabData[]>
    }
  },
  setup(props){
    const currentTabId = ref(props.tabValue[0].id)
    return { currentTabId }
  }
}) 
</script>
<style lang="scss">
  .tab-menu {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0  16px;
    
    & li{
      width: 100%;
      padding: 16px;
      border-bottom: 3px solid transparent;
      text-align: center;
      font-weight: 700;

      &:first-child { 
        margin-left: 0;
      }

      &.on {
        border-color: #ff0;
      }
    }
  }
  .tab-content {
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 16px;
  }
</style>