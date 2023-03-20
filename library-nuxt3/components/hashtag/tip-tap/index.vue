<template>
  <div class="tip-tap">
    <BaseTipTapMenuBar
      v-if="editor"
      :editor="editor"
      :image-count="state.imageCount"
    />
    <div class="inner">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, watch, toRefs } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useNuxtApp } from '#app'
import BaseTipTapMenuBar from '@/components/base/tip-tap/menu-bar/index.vue'
import { extractElementFromString } from '@/plugins/extractElementFromString'

export type Post = {
  data: string,
  images: string[]
}

export default defineComponent({
  name: 'BaseTipTap',
  components: {
    EditorContent,
    BaseTipTapMenuBar
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue','checkMinText' ],
  setup(props, { emit }) {
    const { $checkByte } = useNuxtApp()
    const { modelValue } = toRefs(props)
    const state = reactive({
      currentText: '',
      currentCount:0,
      imageCount: 0
    })
    const checkTextByte = computed(()=> $checkByte(state.currentText, 5000, 'under'))
    const limitText = computed(()=> checkTextByte.value ?  10000: state.currentCount)
    watchEffect(()=> state.currentCount < 10 ? emit('checkMinText', false): emit('checkMinText', true))


    const editor= useEditor({
      content: props.modelValue?.data,
      enableInputRules: false,
      enablePasteRules: false,
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Italic.configure({
          HTMLAttributes: {
            class: 'editor-italic'
          }
        }),
        Heading.configure({
          levels: [1, 2, 3]
        }),
        Bold.configure({
          HTMLAttributes: {
            class: 'editor-bold'
          }
        }),
        Underline.configure({
          HTMLAttributes: {
            class: 'editor-underline'
          }
        }),
        Strike,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Color,
        Highlight.configure({ 
          multicolor: true,
          HTMLAttributes: {
            class: 'editor-highlight'
          }
        }),
        Image,
        Link.configure({
          openOnClick: false
        }),
        ListItem,
        OrderedList.configure({
          itemTypeName: 'listItem'
        }),
        BulletList.configure({
          itemTypeName: 'listItem'
        }),
        CharacterCount.configure({
          limit: limitText.value
        }),
        Placeholder.configure({
          placeholder: `${props.placeholder}`
        })
      ],
      onUpdate: evt => {
        emit('update:modelValue', evt.editor.getHTML() )
        state.currentText = evt.editor.getText()
        state.currentCount = evt.editor.storage.characterCount.characters()
        evt.editor.options.extensions.find(item=> item.name === 'characterCount')!.options.limit =  limitText.value

        const cntCount = extractElementFromString(evt.editor.getHTML(), 'count')
        state.imageCount = typeof cntCount === 'number'? cntCount : 0
      }
    })


    watch(modelValue,(current)=>{
      console.log(editor.value)
      editor.value!.commands.setContent(current, true)
    })
    

    return { state, checkTextByte, editor }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.tip-tap {

  & .inner {
    padding: 12px;
    background: $color-white;
    height: 250px;
    overflow-y:auto;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    > div {
      height: 100%;
    }
  }

  @include mobile {
    & .inner {
      height: 220px;
    }
  }
}

</style>
