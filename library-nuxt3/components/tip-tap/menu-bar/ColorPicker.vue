<template>
  <div ref="target" class="button-set">
    <div v-if="dataSet.sort === 'color'">
      <button
        v-for="(item, index) in dataSet.colors"
        :key="index"
        :style="{backgroundColor: item}"
        :class="['color',{'is-active': editor.isActive('textStyle', { color: item })}]"
        @click="handleOnPickColor(item)"
      ></button>
    </div>
    <div v-else-if="dataSet.sort === 'highlight'">
      <button
        v-for="(item, index) in dataSet.colors"
        :key="index"
        :style="{backgroundColor: item}"
        :class="['highlight',{ 'is-active': editor.isActive('highlight') }]"
        @click="handleOnPickColor(item)"
      ></button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Editor } from '@tiptap/core'
import { onClickOutside } from '@vueuse/core'

export type DataSet = {
  sort: string,
  color: string[]
}

export default defineComponent({
  name: 'ColorPicker',
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor> | undefined
    },
    dataSet: {
      required: true,
      type: Object as PropType<DataSet> | undefined
    }
  },
  emits: ['handleOnCloseBox'],
  setup(props, { emit }){
    const target = ref(null)
    const handleOnPickColor = ( item:string) => {

      props.dataSet.sort === 'color'?
        props.editor.chain().focus().setColor(item).run()
        :
        props.editor.chain().focus().toggleHighlight({ color: item }).run()
      emit('handleOnCloseBox', props.dataSet.sort, item)
    }

    onClickOutside(target, () => emit('handleOnCloseBox', props.dataSet.sort))

    return { handleOnPickColor, target }

  }
})

</script>
<style lang="scss">
@import '@/assets/styles/abstracts/variables.scss';

.button-set {
  position: absolute;
  z-index: $z-index-editor-tooltip;
  padding: 8px;
  background-color: $color-white;
  border: 1px solid #f0f0f0;
  border-radius: 4px;

  > div {
    display: flex;

    button {
      width: 12px;
      height: 12px;
      border: 1px solid #f0f0f0;
    }
  }
}
</style>
