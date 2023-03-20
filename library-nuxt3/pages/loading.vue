<template>
  <div class="container">
    <h2 class="title">Welcome to Ella's Nuxt3</h2>
    <div>
      <span class="sub-title">Setup List</span>
      <ul>
        <li>locale</li>
        <li>alias 셋팅</li>
        <li>scss 설정</li>
        <li>typescript 설정</li>
        <li>store 설정</li>
        <li>vtie / webpack 설정</li>
      </ul>
    </div>
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 120px 0;
  width: 100%;
  max-width: 960px;
  color: $color-white;
}

.title {
  
}


</style>
