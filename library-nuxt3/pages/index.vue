<template>
  <div class="container">
    <h2 class="title">Welcome to Ella's Library(Nuxt3)</h2>
    <div class="contents">
      <span class="sub-title">Tech List</span>
      <ul>
        <li v-for="item in state.techList">
          <NuxtLink  :to="item.path">{{item.text}}</NuxtLink>
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      techList : [
        {value: 'text-field', path: 'text-field', text: 'Text Field'},
        {value: 'checkbox', path: 'checkbox', text: 'Checkbox'},
        {value: 'tab', path: 'tab', text: 'Tab'},
        {value: 'loading', path: 'loading', text: 'Loading Bar'},
        {value: 'hashtag', path: 'hashtag', text: 'Hashtag'},
        {value: 'editor', path: 'editor', text: 'Editor'},
        {value: 'dropdown', path: 'dropdown', text: 'DropDown'},
      ]
    })
    return {state}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 120px 0;
  width: 100%;
  max-width: 960px;
  color: $color-white;
}
.title {
  @include text-style($text-heading2-bold)
}

.sub-title {
  @include text-style($text-heading3-bold)
}
.contents {
  
}


</style>