<template>
  <div class="editor-menu-bar">
    <!-- Menu Category: heading -->
    <div class="button-group">
      <BaseTipTapMenuBarButton
        :icon="{type:'outline', name: 'text-heading-1'}"
        :is-active="$props.editor?.isActive('heading', { level: 1 })"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'text-heading-2'}"
        :is-active="$props.editor?.isActive('heading', { level: 2 })"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'text-heading-3'}"
        :is-active="$props.editor?.isActive('heading', { level: 3 })"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name:'text-paragraph'}"
        :is-active="$props.editor?.isActive('paragraph')"
         @click="editor.chain().focus().setParagraph().run()"
      />
    </div>
    <!-- Menu Category: font -->
    <div class="button-group">
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'text-bold'}"
        :is-active="$props.editor?.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <BaseTipTapMenuBarButton
         :icon="{type:'outline', name: 'text-italic'}"
        :is-active="$props.editor?.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'text-underline'}"
        :is-active="$props.editor?.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
      <BaseTipTapMenuBarButton
         :icon="{type: 'outline', name: 'text-strikethrow'}"
        :is-active="$props.editor?.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      />
    </div>
    <!-- Menu Category: Font Color  -->
    <div class="button-group">
      <div :class="['tooltip-area', state.isColor ? 'on': '']">
        <BaseTipTapMenuBarButton
          :icon="{type: 'outline', name: 'text-color'}"
          :is-active="state.isColor"
          :color ="state.currentColor"
          @click="state.isColor = !state.isColor"
        />
        <ColorPicker
          v-if="state.isColor"
          :editor="editor"
          :data-set="state.colorSet"
          @handle-on-close-box="handleOnCloseColorBox"
        />
      </div>
    <!-- Menu Category: Font Highlight -->
      <div :class="['tooltip-area', state.isHighlight ? 'on': '']">
        <BaseTipTapMenuBarButton
          :icon="{type: 'outline', name: 'text-color-picker'}"
          :is-active="state.isHighlight"
          @click="state.isHighlight = !state.isHighlight"
        />
        <ColorPicker
          v-if="state.isHighlight"
          :editor="editor"
          :data-set="state.highlightSet"
          @handle-on-close-box="handleOnCloseColorBox"
        />
      </div>
    </div>
    <!-- Menu Category: Align  -->
    <div class="button-group">
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'align-left'}"
        :is-active="$props.editor?.isActive('align-left')"
        @click="editor.chain().focus().setTextAlign('left').run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'align-middle'}"
        :is-active="$props.editor?.isActive('align-center')"
        @click="editor.chain().focus().setTextAlign('center').run()"
      />
      <BaseTipTapMenuBarButton
         :icon="{type: 'outline', name: 'align-right'}"
        :is-active="$props.editor?.isActive('align-right')"
        @click="editor.chain().focus().setTextAlign('right').run()"
      />
    </div>
    <!-- List -->
    <div class="button-group">
      <BaseTipTapMenuBarButton
         :icon="{type: 'outline', name: 'list-number'}"
        :is-active="$props.editor?.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'list-point'}"
        :is-active="$props.editor?.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
    </div>

    <!-- Menu Category: Link Upload  -->
    <div class="button-group">
      <div :class="['tooltip-area', state.isLink ? 'on': '']">
        <BaseTipTapMenuBarButton
           :icon="{type: 'outline', name: 'link'}"
          :is-active="$props.editor?.isActive('link', {class: 'link'})"
          @click="handleOnLinkBox('link')"
        />
        <LinkBox
          v-if='state.isLink'
          :editor='editor'
          sort="link"
          @handle-on-close-box="handleOnCloseLinkBox"
        />
      </div>
      <div :class="['tooltip-area', state.isVideo ? 'on': '']">
        <BaseTipTapMenuBarButton
          :icon="{type: 'outline', name: 'video'}"
          :is-active="$props.editor?.isActive('link', {class: 'video'})"
         @click="handleOnLinkBox('video')"
        />
        <LinkBox
          v-if='state.isVideo'
          :editor='editor'
          sort="video"
          @handle-on-close-box="handleOnCloseLinkBox"
        />
      </div>
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'image-compact-sm'}"
        :is-active="false"
        :color="imageCount > 2 ? '#DADADA': '#3F4354'"
        @click="handleOnClickUploadImage"
      />
      <input
        ref="fileUploadInput"
        class="upload-image-input"
        accept="image/*"
        type="file"
        @change="handleOnChangeUploadImage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import { Editor } from '@tiptap/core'
import { useI18n } from '#imports'
import { usePostStore } from '@/store'
import { toastMessage } from '@/plugins/toastMessage'
import ColorPicker from '@/components/base/tip-tap/menu-bar/ColorPicker.vue'
import LinkBox from '@/components/base/tip-tap/menu-bar/LinkBox.vue'

export default defineComponent({
  name: 'BaseTipTapMenuBar',
  components: {
    ColorPicker,
    LinkBox
  },
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor> | undefined
    },
    imageCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['updateTempImg'],
  setup(props, { emit }) {
    const state = reactive({
      colorSet : { sort: 'color' ,colors:['#000000','#cc0000','#ff9424','#237200','#002089','#5a31c2','#777777'] },
      highlightSet : { sort: 'highlight' ,colors:['#f4cccc','#fce5cd','#fffbb9','#d9ead3','#cfe2f3','#e7dffb','#e8e8e8'] },
      currentColor: '#000',
      currentHighlight: '#000',
      isColor: false,
      isHighlight:false,
      isLink: false,
      isVideo: false
    })
    const { t } = useI18n()
    const postStore = usePostStore()
    const fileUploadInput = ref<HTMLElement | null>(null)

    const handleOnClickUploadImage = () => {
      if (props.imageCount > 2) return
      fileUploadInput.value!.click()
    }

    const handleOnChangeUploadImage = async (evt: Event) => {
      try {
        const file = (evt.target as HTMLInputElement).files![0]
        const formData = new FormData()
        formData.append('imgFile', file)
        const res = await postStore.uploadTempImg(formData)
        if (res) {
          props.editor.commands.setImage({ src: res })
          emit('updateTempImg', res)
        }
      } catch (err) {
        console.log(err)
      }
    }

    const handleOnLinkBox = (sort:string) => {
      const selectBlock = window.getSelection() as Selection | null

      if(!selectBlock?.isCollapsed){
        if(selectBlock?.focusNode?.parentElement?.classList[0] === sort || selectBlock?.focusNode?.parentElement?.nodeName !== 'A'){
          sort === 'link' ? state.isLink = true : state.isVideo = true
        }else{
          toastMessage(t('postCreate.toastMessage.havingLink'))
        }
      } else {
        toastMessage(t('postCreate.toastMessage.noLinkSelect'))
      }
    }

    const handleOnCloseLinkBox = ( sort:string ) => {
      sort === 'link' ? state.isLink = false : state.isVideo = false
    }

    const handleOnCloseColorBox = (sort:string, item:string) => {
      if(sort === 'color'){
        state.isColor = false
        state.currentColor = item
      }else{
        state.isHighlight = false
        state.currentHighlight = item
      }
    }

    return { state, fileUploadInput, handleOnClickUploadImage, handleOnChangeUploadImage,handleOnCloseColorBox, handleOnLinkBox, handleOnCloseLinkBox }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';

.editor-menu-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 0;
  width: 100%;
  height: auto;
  padding: 12px;
  background-color: $color-bg-2;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  .button-group {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding-right: 12px;

    &:not(:last-of-type):after {
      position: absolute;
      top: 50%;
      right: 6px;
      width: 1px;
      height: 16px;
      content: '';
      background-color: $color-black-10p;
      transform: translateY(-50%);
    }

    .popup {
      position : absolute;
      top: 32px;
      width: 250px;
      padding: 16px;
      background: #fff;
      border: 2px solid #ddd;
      z-index: 100;

      & em {
        margin-right: 8px;
      }
      & label {
        display: block;
        margin-top: 8px;
      }

      & input {
        border : 1px solid #eee;
      }

    }
  }

  .upload-image-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .tooltip-area {
    position: relative;
  }
}

</style>
