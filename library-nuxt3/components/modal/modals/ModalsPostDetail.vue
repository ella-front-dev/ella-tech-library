<template>
  <VueFinalModal
    v-model="show"
    :name="modalsName.MODAL_POST_DETAIL"
    :content-class="'modal-content'"
    classes="modal-container"
    @before-open="evt => handleOnGetParams(evt.ref.params)"
  >
    <BoxBase
      class="modal-box"
      :round="20"
    >
      <div class="modal-header">
        test
      </div>
      <LayoutScrollContainer class="modal-contents post-detail">
        <BoxPost
          v-if="source"
          :view-type="'detail'"
          :source="source"
        />
      </LayoutScrollContainer>
    </BoxBase>
  </VueFinalModal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteParams } from 'vue-router'
import { PostsItem } from '@/store/post/type'
import { modalsName } from '@/components/base/modal/modals/modals.name'
import BoxBase from '@/components/box/Base.vue'
import BoxPost from '@/components/box/post/index.vue'

export default defineComponent({
  name: modalsName.MODAL_POST_DETAIL,
  components: {
    BoxBase,
    BoxPost
  },
  inheritAttrs: false,
  setup() {
    const show = ref(false)
    const source = ref<PostsItem | null>(null)

    const handleOnGetParams = (evt: RouteParams) => {
      source.value = (evt.value as unknown as PostsItem)
    }

    return { modalsName, show, source, handleOnGetParams }
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
