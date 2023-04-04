<template>
  <div ref="linkBox" class="link-box">
    <label>
      <span class="title">URL</span>
      <input v-model.trim="state.value" type="text"/>
    </label>
    <button 
      type="button"
      @click="handleOnSetLink"
    >
      확인
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, ref } from 'vue'
import { Editor } from '@tiptap/core'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'LinkBox',
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor> | undefined
    },
    sort: {
      required: true,
      type: String
    }
  },
  setup(props, { emit }){
    const linkBox = ref(null)
    const state = reactive({
      value: props.editor.getAttributes('link').href
    })

    const handleOnSetLink = () => {
      // //cancelled & empty & undefined
      if (state.value === null || state.value === '' || state.value === undefined) {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        state.value = null
        return  emit('handleOnCloseBox', props.sort)
      }else{
        props.sort === 'link' ?
          props.editor.chain().focus().extendMarkRange('link').setLink({ href: state.value, class: 'link' }).run()
          :
          props.editor.chain().focus().extendMarkRange('link').setLink({ href: state.value, class: 'video' }).run()
      }
      // update link
      state.value = null
      emit('handleOnCloseBox', props.sort)
    }

    onClickOutside(linkBox, () => {
      state.value = null
      emit('handleOnCloseBox', props.sort)
    })


    // const handleOnSetVideo = () => {
    //   let isBlock = false
    //   window.getSelection().isCollapsed ? '' : isBlock = true

    //   if(isBlock){
    //     const previousUrl = props.editor.getAttributes('link').href
    //     const url = window.prompt('URL', previousUrl)

    //     // //cancelled
    //     if (url === null) {
    //       return
    //     }
    //     // // empty
    //     if (url === '') {
    //       props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    //       return
    //     }
    //     // update link
    //     props.editor.chain().focus().extendMarkRange('link').setLink({ href: url, class: 'video' }).run()
    //     console.log(props.editor.getAttributes('link'))
    //   }else{
    //     alert('링크할 텍스트를 선택해주세요.')
    //   }
    // }

    return {
      state,
      linkBox,
      handleOnSetLink
    }
  }
})
</script>
<style lang="scss">
@import '@/assets/styles/abstracts/variables.scss';

  .link-box {
    position: absolute;
    z-index: $z-index-editor-tooltip;
    padding: 8px;
    background-color: $color-white;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    text-align: right;
    
    > label {
      display: flex;
    }

    .title {
      display: block;
      font-size: 12px;
    }
    input {
      border: 1px solid #f0f0f0;
    }

    button {
      margin-top: 8px; 
      background-color: #777;
      color: #fff;
      padding: 8px;
      font-size: 12px; 
    }

  }
</style>