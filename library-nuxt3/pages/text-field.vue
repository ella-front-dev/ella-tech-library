<template>
  <div class="container">
    <h2 class="title">Text Field Sample</h2>
    <form class="content">
      <div class="section">
        <span class="sub-title">Input Sample</span>
        <BaseInput v-model="state.input" placeholder="Base Input...." />
        <span class="option-title">Options</span>
        <ul class="option-list">
          <li>
            <span class="list-title">Type / Label / Placeholder</span>
            <span class="list-content">
              <BaseInput
                v-model="state.input2"
                id="label"
                type="password"
                :label="'Label'"
                :placeholder="'write your password...'"
              />
            </span>
          </li>
          <li>
            <span class="list-title">Validate</span>
            <span class="list-content">
              <BaseInput
                v-model="state.input3"
                :isOption="true"
                :validate="validate"
                :autoComplete="'new-password'"
                :placeholder="'validate...'"
                @on-keyup="onValidate"
              />
            </span>
          </li>
        </ul>
      </div>
      <div class="section">
        <span class="sub-title">Textarea Sample</span>
        <BaseTextarea
          v-model="state.textarea"
          name="text"
          :placeholder="'write Base Textarea...'"
          :rows="3"
          :no-resize="true"
          @on-keyup="onValidate"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { definePageMeta } from '#imports'
import BaseInput from '@/components/base/Input.vue'
import BaseTextarea from '@/components/base/Textarea.vue'

definePageMeta({
  layout: 'sub',
})

export default defineComponent({
  components: {
    BaseInput,
    BaseTextarea,
  },
  setup() {
    const state = reactive({
      input: '',
      input2: '',
      input3: '',
      textarea: '',
    })

    const validate = reactive({
      status: true,
      isSuccess: false,
      successMessage: '성공',
      isFail: false,
      failMessage: '실패',
    })

    const onValidate = () => {
      console.log(state.input3)
      if (state.input3.length === 0) {
        validate.isFail = false
        validate.isSuccess = false
        return
      }
      if (state.input3.length < 5 && state.input3.length > 0) {
        console.log(state.input3.length)
        validate.isFail = true
      } else {
        validate.isFail = false
        validate.isSuccess = true
      }
    }

    return { state, validate, onValidate }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 120px 24px;
  width: 100%;
  max-width: 960px;
}

.title {
  @include text-style($text-heading2-bold);
}

.content {
  width: 100%;

  .section {
    margin-top: 24px;
    border-top: 1px solid $color-text-5;
  }
}

.sub-title,
.option-title {
  display: block;
  margin-top: 14px;
  padding-bottom: 8px;
  font-weight: 700;
}

.option-list {
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    .list-title {
      font-weight: 500;
    }
    .list-content {
      padding: 16px 24px;
    }
  }
}
</style>
