<template>
  <div class="iframe-wrap">
    <ClientOnly>
      <iframe
        v-if="!state.isFail && !state.isLoading && url"
        ref="contents"
        :src="url"
        class="iframe-box"
        @load="onScrollIframe"
      />
      <BoxEmptyMessage
        v-if="!state.isLoading && state.isFail"
        :message="'접근 불가한 주소입니다.'"
      />
      <BaseLoadingIndicator
        v-if="state.isLoading"
        :size="80"
        :fill="true"
        :bg-bright="'light'"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import BaseLoadingIndicator from '@/components/base/LoadingIndicator.vue'
import BoxEmptyMessage from '@/components/box/EmptyMessage.vue'

export default defineComponent({
  name: 'BaseIframeContainer',
  components: {
    BoxEmptyMessage,
    BaseLoadingIndicator
  },
  props:{
    url : {
      required: true,
      type: String
    },
    scrollTarget: {
      type: String,
      default : ''
    }
  },
  setup(props) {
    const contents = ref<HTMLIFrameElement|null>(null)
    const state = reactive({
      isLoading: false,
      isFail: false,
      baseUrl: '',
      iframeHeight:'100%'
    })
  

    const onScrollIframe = () => {

      const height = props.scrollTarget ? 
        contents.value?.contentWindow?.document.body.querySelector(`.${props.scrollTarget}`)?.clientHeight
        : 
        contents.value?.contentWindow?.document.body.clientHeight 
      
      console.log('height', contents.value?.contentWindow?.document.body.querySelector(`.${props.scrollTarget}`)?.clientHeight)
      console.log('he', height)
      if(typeof height === 'number' ) contents.value!.style.height = `${height}px`

      console.log()

    }
     
    onMounted(async ()=> {

      const myRequest = new Request(props.url)
      try{
        state.isLoading = true
        await $fetch(myRequest)
        console.log('success')
        state.baseUrl = props.url 
        state.isFail = false
      }catch(err){
        console.log('err', err)
        state.isFail = true
      }finally{
        state.isLoading = false
      }
    })
  
    return { contents, state, onScrollIframe }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.iframe-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.iframe-box {
  width: 100%;
  height: 100%;
}

</style>