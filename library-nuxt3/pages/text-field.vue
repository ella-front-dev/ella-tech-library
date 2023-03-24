<template>
  <div class="container">
    <h2 class="title">Text Field Sample</h2>
    <div class="content">
      <div>
        <span class="sub-title">Input Sample</span>
        <BaseInput v-model="state.input"  />
        <span class="option-list">Options</span>
        <ul>
          <li>
            <span>Type / Label / Placeholder</span>
            <span>
              <BaseInput v-model="state.input2" :label="'Password'" type="password" :placeholder="'write your password'"   />
            </span>
          </li>
          <li>
            <span></span>
            <span>
              <BaseInput v-model="state.input3" :isOption="true" :validate="{status: true, }"  />
            </span>
          </li>
        </ul>

      </div>
      <div>
        <span class="sub-title">Textarea Sample</span>
        <BaseTextarea v-model="state.textarea"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BaseInput from '@/components/base/Input.vue'
import BaseTextarea from '@/components/base/Textarea.vue'

export default defineComponent({
  components: {
    BaseInput,
    BaseTextarea
  },
  setup() {
    const state = reactive({
      input : '',
      input2 : '',
      input3 : '',
      textarea : ''
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
