<template>
  <div class="hashtag-input-area">
    <input
      id="tag-input"
      ref="inputRef"
      type="text"
      class="hashtag-input"
      placeholder="Tag를 입력하세요."
      @focus="handleOnInputFocusBlur(true)"
      @blur="handleOnInputFocusBlur(false)"
    />
    <div :class="['hashtag-menu-wrap', { on: showDropDown }]">
      <ul
        class="hashtag-menu-box"
      >
        <HashtagMenu
          v-for="(item, index) in filterTags"
          :key="index"
          :index="index"
          :item="item"
          :active-index="choiceTagsIndex"
          @click="clickOnMenu(item)"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, InputHTMLAttributes, onMounted, onUnmounted,reactive,ref, PropType, watch, computed } from 'vue'
import { useNuxtApp } from '#app'
import HashtagMenu, { hashtagSetType } from '@/components/base/create-hashtag/HashtagMenu.vue'

// import { CheckTextAndNumber } from '@/plugins/commonFunction'

export default defineComponent({
  name: 'TagInput',
  components: {
    HashtagMenu
  },
  props: {
    hashtagSet: {
      required: true,
      type : Array as PropType<hashtagSetType[]>
    },
    tagSet: {
      type : Array as PropType<hashtagSetType[]>,
      default: ()=>([])
    }
  },
  emits: [
    'update',
    'delete',
    'checkDoubleTag'
  ],
  setup(props, { emit }) {
    const { $validByte, $CheckTextAndNumber  } = useNuxtApp()

    const inputRef = ref<HTMLInputElement | null>(null)
    const inputFocus = ref(false)
    const choiceTagsIndex = ref<number | null>(null)

    const state = reactive<{ tags: hashtagSetType[], preValue: string, activeIndex: number, inputValue: string }>({
      tags: [],
      preValue: '',
      activeIndex: 0,
      inputValue : ''
    })
    const filterTags = computed(()=> state.inputValue ? props.hashtagSet.filter(item => item.hashtagNm.includes(state.inputValue)) : [])
    // const showDropDown = computed(() => filterTags.value.length && inputFocus.value)
    const showDropDown = computed(() => filterTags.value.length && state.inputValue)

    watch(showDropDown, (cur) => {
      if (!cur) {
        choiceTagsIndex.value = null
      }
    },{ immediate: true })

    // Keyup 이벤트 
    const handleOnKeyUp = (evt: KeyboardEvent) => {
      state.inputValue = (evt.target as InputHTMLAttributes)?.value.trim()
      /** 
       * 1. Enter & Spacebar
       *  - 현재 Null값인지 체크
       *    - Null 값이면 Not Action
       *    - Null 값아니면 등록 이벤트
       * 2. Key
       *  - Key 입력
       *    - 특수문자, 중복 태그 체크
       *  - DropDown 메뉴 필터 기능 작동
       * 3. Delete
       *  - 앞에 글자 유무
       *    - 글자 있을때, 글자 삭제
       *    - 글자 없을때, 태그 삭제
      */

      // 유효성 검사
      handleOnValidate()

      if(evt.code === 'Comma' || evt.code === 'Enter'){
        if(state.inputValue !== ''){
          choiceTagsIndex.value !== null ?
            emit('checkDoubleTag', filterTags.value[choiceTagsIndex.value].hashtagNm) 
            :emit('checkDoubleTag', state.inputValue)
        }
        // 초기화
        // (evt.target as InputHTMLAttributes).value = ''
        handleOnReset()
      } 
      // backspace 입력
      else if(evt.code === 'Backspace'){
        if (state.inputValue  === '' && !state.preValue){
          emit('delete')
        }
      }
      // 드롭다운 메뉴에서 해시태그 선택: increase
      else if (evt.code === 'ArrowDown') {
        handleOnChoiceTag('increase')
      }
      // 드롭다운 메뉴에서 해시태그 선택: decrease
      else if (evt.code === 'ArrowUp') {
        handleOnChoiceTag('decrease')
      }
    }

    const handleOnUpdateValue = () => {
      state.preValue =  inputRef.value!.value
    }


    const handleOnValidate = () => {
      const target = inputRef.value!.value
      if(!$CheckTextAndNumber(target)){
        handleOnReset()
        alert('한글, 영문, 숫자만 입력 가능합니다.')
      } else if(!$validByte(target, 60, 'and_under')){
        handleOnReset()
        alert('최대 30자까지 입력 가능합니다.')
      } else if(props.tagSet.length >= 5){   
        handleOnReset()
        alert('태그는 최대 5개까지 입력 가능합니다.')
      }
    }

    
    const  clickOnMenu = (item:hashtagSetType) => {
      (props.tagSet.length >= 5) ?  alert('태그는 최대 5개까지 입력 가능합니다.') : emit('update', item)
      handleOnReset()
    }

    const handleOnReset = () => {
      state.inputValue = ''
      inputRef.value!.value = ''
    }


    const handleOnChoiceTag = (type: 'increase' | 'decrease') =>{
      if (!showDropDown.value) return
      if (choiceTagsIndex.value === null){
        choiceTagsIndex.value = 0
        return 
      } 
      if(choiceTagsIndex.value === filterTags.value.length-1){
        choiceTagsIndex.value = null
        return 
      }

      switch (type) {
        case 'increase':

          choiceTagsIndex.value = (choiceTagsIndex.value % filterTags.value.length) + 1
          break
        case 'decrease':
          choiceTagsIndex.value = (choiceTagsIndex.value - 1) > 0 ? choiceTagsIndex.value - 1 : 0
          break
        default:
          throw new Error('handle on choice tag type is not match')
      }

      console.log(choiceTagsIndex.value)
    }

    const handleOnInputFocusBlur = (focus: boolean) => {
      inputFocus.value = focus
    }

    // Input Keyup Event
    onMounted(() => {
      inputRef.value!.addEventListener('keyup', (evt: KeyboardEvent) => handleOnKeyUp (evt))
      inputRef.value!.addEventListener('keydown', () => handleOnUpdateValue ())
    })

    onUnmounted(()=>{
     inputRef.value!.removeEventListener('keyup', (evt: KeyboardEvent) => handleOnKeyUp (evt))
     inputRef.value!.removeEventListener('keydown',() => handleOnUpdateValue ())
    })

    return {
      state,
      inputRef,
      showDropDown,
      choiceTagsIndex,
      filterTags,
      handleOnKeyUp,
      clickOnMenu,
      handleOnInputFocusBlur
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag-input-area {
  position: relative;
  padding-left: 15px;
}

.hashta-input-box {
  position: relative;

  .hashtag-input{
    position: relative;
    background-color: transparent;
    z-index:1;
  }
}

.hashtag-menu-wrap {
  position: absolute;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  @include transition(all .2s ease-in-out);
  pointer-events: none;
  z-index: $z-index-drop-down;

  &.on {
    opacity: 1;
    pointer-events: auto;
  }

  .hashtag-menu-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 4px 0;
    border: 1px solid $color-black-5p;
    border-radius: 5px;
    background-color: #ffffff;
  }
}
</style>
