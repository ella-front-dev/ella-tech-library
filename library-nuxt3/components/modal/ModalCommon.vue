<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    :content-class="['modal-content', { full: $attrs.mobileFull }]"
  >
    <BoxBase
      :class="['modal-box']"
      :modal="{ type: 'modal', isMobileFull: $attrs.mobileFull }"
      :round="20"
    >
      <div v-if="slots.title || $attrs.showCloseBtn" class="modal-header">
        <h4 v-if="slots.title" class="title">
          <slot name="title" />
        </h4>

        <div v-if="$attrs.showCloseBtn" class="close-wrap" @click="close">
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
        v-if="slots.noScrollContents"
        class="no-scroll-area"
      >
        <slot name="noScrollContents" :params="params" />
      </div>
      <div v-if="$attrs.actions?.isShow" class='modal-actions'>
        <BaseButtonsText
          :label="$attrs.actions.label[0]"
          :theme="'transparent'"
          :size="32"
          class="btn-action"
          @click="$emit('cancel', close)"
        />
        <BaseButtonsText
          :label="$attrs.actions.label[1]"
          :theme="'primary-red-light'"
          :size="32"
          :disabled="$attrs.actions.disabled"
          class="btn-action"
          @click="$emit('confirm', close)"
        />
      </div>
    </BoxBase>
  </vue-final-modal>
</template>
<script lang="ts">
import { defineComponent , useSlots } from 'vue'
import BoxBase from '@/components/box/Base.vue'
import BaseButtonsIcon from '@/components/base/buttons/Icon.vue'
import BaseButtonsText from '@/components/base/buttons/Text.vue'

export default defineComponent({
  name: 'ModalCommon',
  components: {
    BoxBase,
    BaseButtonsIcon,
    BaseButtonsText
  },
  inheritAttrs: false,
  emits: {
    confirm: (_evt: any) => true,
    cancel: (_evt: any) => true,
    optional: (_evt: any) => true
  },
  setup() {
    const slots = useSlots()


    return { slots }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.vfm--overlay) {
  background-color: hex-to-rgba($color-black, .65);
}

:deep(.modal-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  width: 100%;
}

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
    margin-bottom: 30px;

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
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    > .btn-action {
      width: 100px;
    }
  }
}

@include mobile {
  :deep(.modal-content){
    padding: 0 20px;

    .modal-box {
      .modal-header {
        padding: 16px 20px;
        margin-bottom: 0;

        > .title {
          @include text-style($text-heading3-bold);
        }
      }
    }

    &.full{
      padding: 0;
      height: 100%;
    }

  }

  .modal-box {
    .modal-actions {
      display: flex;
      margin-top: 0;
      padding : 0 20px 20px;
      gap:8px;

      > .btn-action {
        width: 50%;
      }
    }
    .modal-contents {
      padding: 0 20px 20px;
    }

    .no-scroll-area {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>
