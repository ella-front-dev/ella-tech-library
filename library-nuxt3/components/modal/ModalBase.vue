<template>
  <BoxBase
    class="modal-box"
    :floating="true"
  >
    <div class="modal-header">
      <h4 v-if="title" class="title">{{title}}</h4>

      <div class="close-wrap" @click="handleOnClose">
        <BaseButtonsIcon
          :icon="{ type: 'outline', name: 'close-extend' }"
          class="btn-close"
        />
      </div>
    </div>

    <LayoutScrollContainer
      v-if="slots.contents"
      class="modal-contents"
    >
      <slot name="contents"></slot>
    </LayoutScrollContainer>

    <div
      v-if="slots.actions"
      class="modal-actions"
    >
      <slot name="actions"></slot>
    </div>
  </BoxBase>
</template>
<script lang="ts">
import { defineComponent , useSlots } from 'vue'
import BoxBase from '@/components/box/Base.vue'
import BaseButtonsIcon from '@/components/base/buttons/Icon.vue'
import LayoutScrollContainer from '@/components/layout/ScrollContainer.vue'

export default defineComponent({
  name: 'ModalBase',
  components: {
    BoxBase,
    BaseButtonsIcon,
    LayoutScrollContainer
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  emits: {
    close: (_eventName: 'close') => true
  },
  setup(_props, { emit }) {
    const slots = useSlots()

    const handleOnClose = () => {
      emit('close', 'close')
    }

    return { slots, handleOnClose }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.modal-box {
  padding: 28px 20px 37px;
  width: 100%;
  max-width: 670px;

  .modal-header {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: flex-end;

    > .title {
      flex-grow: 1;
      @include text-style($text-heading2-bold);
    }

    .close-wrap {
      font-size: 0;

      .btn-close {
        color: $color-text-2;
      }
    }
  }

  .modal-contents {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .modal-actions {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
}
</style>
