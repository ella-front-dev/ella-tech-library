<template>
  <div class="hashtag-input-box">
    <label class="hashtag-input-label">
      <input
        ref="inputRef"
        type="text"
        class="hashtag-input"
        :placeholder="'postCreate.placeholder.hashtag'"
        @focus="handleOnInputFocusBlur(true)"
        @blur="handleOnInputFocusBlur(false)"
      />
    </label>
    <div :class="['hashtag-menu-wrap', { on: showDropDown }]">
      <!-- <ul ref="menuContainer" class="hashtag-menu-box">
        <HashtagMenu
          v-for="(item, index) in filterTags"
          :ref="
            (el) => {
              menuItemRef[index] = el
            }
          "
          :key="index"
          :index="index"
          :item="item"
          :active-index="choiceTagsIndex"
          @click="clickOnMenu(item)"
        />
      </ul> -->
      <HashtagMenu
        :ref="tagMenuRef"
        :filter-tags="filterTags"
        :active-index="choiceTagsIndex"
        @on-update="onUpdateActiveIndex"
        @on-click="clickOnMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  InputHTMLAttributes,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  computed,
  PropType,
} from 'vue'
import { useNuxtApp } from '#app'
import HashtagMenu, {
  hashtagSetType,
} from '@/components/hashtag/HashtagMenu.vue'
import { detectElementInViewport } from '@/plugins/detectElementInViewport'
import { toastMessage } from '@/plugins/toastMessage'

export default defineComponent({
  name: 'TagInput',
  components: {
    HashtagMenu,
  },
  props: {
    hashtagSet: {
      required: true,
      type: Array as PropType<hashtagSetType[]>,
    },
    tagSet: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update', 'delete', 'checkDoubleTag'],
  setup(props, { emit }) {
    const { $checkByte, $checkSpecialCharacters } = useNuxtApp()
    const inputRef = ref<HTMLInputElement | null>(null)
    const inputFocus = ref(false)
    const choiceTagsIndex = ref<number | null>(null)
    const menuItemRef = ref<typeof HashtagMenu[]>([])
    const menuContainer = ref<HTMLElement | null>(null)
    const tagMenuRef = ref(null)

    const state = reactive({
      tags: [],
      preValue: '',
      activeIndex: 0,
      inputValue: '',
    })

    // input에 따라 hashtagSet의 값을 필터해서 보여주는 기능
    const filterTags = computed(() => {
      if (state.inputValue) {
        return props.hashtagSet.filter((item: hashtagSetType) =>
          item.hashtagNm.includes(state.inputValue),
        )
      }
      return []
    })

    // hashtagMenu를 보여줄지 체크
    const showDropDown = computed(
      () => filterTags.value.length && state.inputValue,
    )

    watch(
      showDropDown,
      (cur) => {
        if (!cur) {
          choiceTagsIndex.value = null
        }
      },
      { immediate: true },
    )

    // Keyup 이벤트
    const handleOnKeyUp = (evt: KeyboardEvent) => {
      debugger
      state.inputValue = (evt.target as InputHTMLAttributes)?.value.trim()

      // 유효성 검사
      handleOnValidate()

      //1. Enter & Comma
      if (evt.code === 'Comma' || evt.code === 'Enter') {
        if (state.inputValue !== '') {
          choiceTagsIndex.value !== null
            ? emit('checkDoubleTag', filterTags.value[choiceTagsIndex.value])
            : emit('checkDoubleTag', state.inputValue)
        }
        // 초기화
        handleOnReset()
      }
      //2. Backspace
      else if (evt.code === 'Backspace') {
        if (state.inputValue === '' && !state.preValue) {
          emit('delete')
        }
      }
      // 드롭다운 메뉴에서 해시태그 선택: increase
      else if (evt.code === 'ArrowDown') {
        // tagMenuRef.value?.handleOnChoiceTag()
        // handleOnChoiceTag('increase')
      }
      // 드롭다운 메뉴에서 해시태그 선택: decrease
      else if (evt.code === 'ArrowUp') {
        // handleOnChoiceTag('decrease')
      }
    }

    const handleOnUpdateValue = () => {
      state.preValue = inputRef.value!.value
    }

    const handleOnValidate = () => {
      const target = inputRef.value!.value

      if ($checkSpecialCharacters(target)) {
        handleOnReset()
        toastMessage('한글, 영문, 숫자만 입력 가능합니다.')
      } else if ($checkByte(target, 60, 'over')) {
        handleOnReset()
        toastMessage('최대 30자까지 입력 가능합니다.')
      } else if (props.tagSet.length >= 5) {
        handleOnReset()
        toastMessage('태그는 최대 5개까지 입력 가능합니다.')
      }
    }

    const clickOnMenu = (item: string) => {
      props.tagSet.length >= 5
        ? toastMessage('태그는 최대 5개까지 입력 가능합니다.')
        : emit('update', item)
      handleOnReset()
    }

    const handleOnReset = () => {
      state.inputValue = ''
      inputRef.value!.value = ''
    }

    // const handleOnChoiceTag = (type: 'increase' | 'decrease') => {
    //   if (!showDropDown.value) return
    //   if (choiceTagsIndex.value === null) {
    //     choiceTagsIndex.value = 0
    //     return
    //   }
    //   if (choiceTagsIndex.value === filterTags.value.length - 1) {
    //     choiceTagsIndex.value = null
    //     return
    //   }

    //   switch (type) {
    //     case 'increase':
    //       choiceTagsIndex.value =
    //         (choiceTagsIndex.value % filterTags.value.length) + 1
    //       if (
    //         !detectElementInViewport(
    //           menuItemRef.value[choiceTagsIndex.value].$el,
    //           menuContainer.value,
    //         )
    //       ) {
    //         menuItemRef.value[choiceTagsIndex.value].$el.scrollIntoView()
    //       }
    //       break
    //     case 'decrease':
    //       choiceTagsIndex.value =
    //         choiceTagsIndex.value - 1 > 0 ? choiceTagsIndex.value - 1 : 0
    //       if (
    //         !detectElementInViewport(
    //           menuItemRef.value[choiceTagsIndex.value].$el,
    //           menuContainer.value,
    //           'top',
    //         )
    //       ) {
    //         menuItemRef.value[choiceTagsIndex.value].$el.scrollIntoView()
    //       }
    //       break
    //     default:
    //       throw new Error('handle on choice tag type is not match')
    //   }
    // }

    const handleOnInputFocusBlur = (focus: boolean) => {
      inputFocus.value = focus
    }

    const onUpdateActiveIndex = (index: number) => {
      choiceTagsIndex.value = index
    }

    // Input Keyup Event
    onMounted(() => {
      inputRef.value!.addEventListener(
        'keyup',
        (evt: KeyboardEvent) => handleOnKeyUp(evt),
        true,
      )
      inputRef.value!.addEventListener(
        'keydown',
        () => handleOnUpdateValue(),
        true,
      )
      console.log('tagMenuRef', tagMenuRef.value)
    })

    onUnmounted(() => {
      if (inputRef.value) {
        inputRef.value!.removeEventListener('keyup', (evt: KeyboardEvent) =>
          handleOnKeyUp(evt),
        )
        inputRef.value!.removeEventListener('keydown', () =>
          handleOnUpdateValue(),
        )
      }
    })

    return {
      state,
      inputRef,
      menuItemRef,
      tagMenuRef,
      menuContainer,
      showDropDown,
      choiceTagsIndex,
      filterTags,
      handleOnKeyUp,
      clickOnMenu,
      handleOnInputFocusBlur,
      onUpdateActiveIndex,
    }
  },
})
</script>

<style lang="scss">
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

.hashtag-input-box {
  position: relative;
  margin-left: 8px;
  flex-grow: 1;
  min-width: 50%;

  .hashtag-input-label {
    display: block;
    width: 100%;
    border-radius: 8px;
  }

  .hashtag-input {
    width: 100%;

    &::placeholder {
      color: $color-text-3;
    }
  }
}

.hashtag-menu-wrap {
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  @include transition(all 0.2s ease-in-out);
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
    max-height: 150px;
    padding: 4px 0;
    border: 1px solid $color-black-5p;
    border-radius: 5px;
    background-color: #ffffff;
    overflow: auto;
  }
}
</style>
