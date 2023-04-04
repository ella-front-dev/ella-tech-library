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
          @handleOnCloseBox="handleOnCloseColorBox"
        />
      </div>
    </div>
    <!-- Menu Category: Font Highlight -->
    <div class="button-group">
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
          @handleOnCloseBox="handleOnCloseColorBox"
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
          @click="handleOnLinkbox('link')"
        />
        <LinkBox
          v-if='state.isLink'
          :editor='editor'
          sort="link"
          @handleOnCloseBox="handleOnCloseLinkBox"
        />
      </div>
      <div :class="['tooltip-area', state.isVideo ? 'on': '']">
        <BaseTipTapMenuBarButton
          :icon="{type: 'outline', name: 'video'}"
          :is-active="$props.editor?.isActive('link', {class: 'video'})"
         @click="handleOnLinkbox('video')"
        />
        <LinkBox
          v-if='state.isVideo'
          :editor='editor'
          sort="video"
          @handleOnCloseBox="handleOnCloseLinkBox"
        />
      </div>
      <BaseTipTapMenuBarButton
        :icon="{type: 'outline', name: 'image-compact-sm'}"
        :is-active="false"
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
import ColorPicker from '@/components/base/tip-tap/menu-bar/ColorPicker.vue'
import LinkBox from '@/components/base/tip-tap/menu-bar/LinkBox.vue'


interface SampleImageResponse {
  fullImageUrl: string
}

export default defineComponent({
  name: 'BaseTipTapMenuBar',
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor> | undefined
    }
  },
  components: {
    ColorPicker,
    LinkBox
  },
  setup(props) {
    const state = reactive({
      colorSet : {sort: 'color' ,colors:['#958DF1','#F98181','#FAF594']},
      highlightSet : {sort: 'highlight' ,colors:['#ffc078','#8ce99a','#74c0fc']},
      currentColor: '#000',
      currentHighlight: '#000',
      isColor: false,
      isHighlight:false,
      isLink: false,
      isVideo: false,
    })
    const fileUploadInput = ref<HTMLElement | null>(null)

    const handleOnClickUploadImage = () => {
      fileUploadInput.value!.click()
    }

    const handleOnChangeUploadImage = async (evt: Event) => {
      const file = (<HTMLInputElement>evt.target).files![0]
      const formData = new FormData()
      formData.append('upload', file)

      const res = await new Promise<SampleImageResponse>(function(resolve, reject) {
        setTimeout(() => {
          const random = Math.random()
          if (random > 0.2) resolve({ fullImageUrl: 'https://source.unsplash.com/8xznAGy4HcY/800x400' })
          else reject(new Error('Mockup Error Exception fetchUser'))
        }, 200)
      })

      try {
        if (res.fullImageUrl) {
          props.editor.commands.setImage({ src: res.fullImageUrl })
        }
      } catch (err) {
        console.log(err)
      }
    }

    const handleOnLinkbox = (sort:string) => {
      const selectBlock = window.getSelection() as Selection | null
      let isBlock = false
      selectBlock?.isCollapsed ? '' : isBlock = true

      if(isBlock){
        if(selectBlock?.focusNode?.parentElement?.classList[0] === sort || selectBlock?.focusNode?.parentElement?.nodeName !== 'A'){
           sort === 'link' ? state.isLink = true : state.isVideo = true
        }else{
          alert('이미 링크지정이 되었습니다.')
        }
      } else {
        alert('링크할 텍스트를 선택해주세요.')
      }
    }

    const handleOnCloseLinkBox = ( sort:string ) => {
      console.log('sort', sort)
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

    return { state, fileUploadInput, handleOnClickUploadImage, handleOnChangeUploadImage,handleOnCloseColorBox, handleOnLinkbox, handleOnCloseLinkBox }
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
  padding: 6px 12px;
  border-bottom: 1px solid $color-black-5p;

  .button-group {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding-right: 24px;

    &:not(:last-of-type):after {
      position: absolute;
      top: 50%;
      right: 12px;
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
