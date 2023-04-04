<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    :click-to-close="false"
  >
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <div class="modal__content">
      <slot name="content"></slot>
    </div>
    <div :class="['modal__action','grid-wrapper',`grid-${$attrs.btn.grid}`, 'gap-4']">
      <BaseButtonsText
        v-show="$attrs.btn.isCancel"
        :label="'cancel'"
        :theme="'transparent'"
        :size="32"
        :full-width="true"
        @click="$emit('cancel', close)"
      />
      <BaseButtonsText
        :label="'confirm'"
        :theme="'primary-red-light'"
        :size="32"
        :full-width="true"
        @click="$emit('confirm', close)"
      />
    </div>
  </vue-final-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseButtonsText from '@/components/base/buttons/Text.vue'

export default defineComponent({
  name: 'ModalDialog',
  components: { BaseButtonsText },
  inheritAttrs: false,
  emits: ['confirm', 'cancel'],
  setup() {
    return {}
  }
})

</script>
<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';


::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 350px;
  padding: 30px 20px;
  box-shadow: 5px 5px 10px hex-to-rgba($color-bg-custom-4, .05);
  border-radius: 20px;
  background: $color-white;
}
.modal__title {
  text-align: center;
  @include text-style($text-heading2-bold)

}
.modal__content {
  margin-top: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

@include mobile {
  ::v-deep(.modal-content) {
    padding: 20px;
  }
  .modal__title {
    text-align: center;
    @include text-style($text-heading3-bold)
  }
}
</style>
