<template>
  <div class="tip-tap">
    <label class="input-set">
      <input type="text" placeholder="Title">
    </label>
    <BaseTipTapMenuBar
      v-if="editor"
      :editor="editor"
    />
    <div class="inner">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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

export type Post = {
  data: string,
  images: string[]
}

export default defineComponent({
  name: 'BaseTipTap',
  components: {
    EditorContent
  },
  props: {
    modelValue: {
      type: Object as PropType<Post>,
      default: () => null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editor = useEditor({
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
        })
      ],
      onUpdate: evt => {
        emit('update:modelValue', { ...props.modelValue, data: evt.editor.getHTML() })
      }
    })
    return { editor }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';

.tip-tap {
  padding: 14px;

  & .input-set {
    display: block;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius:  4px;
  }
  

  & .inner {
  margin-top: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  height: 200px;
}
}

</style>
