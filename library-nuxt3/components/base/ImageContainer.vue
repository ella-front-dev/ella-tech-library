<template>
  <div :class="['image-container', ratioClass, { 'fill-container': $props.isFillContainer }]">
    <ClientOnly>
      <img
        v-if="$props.imageUrl"
        :src="$props.imageUrl"
        alt=""
        @error="(evt) => handleOnLoadFail(evt)"
        @load="handleOnLoadDone"
      />
    </ClientOnly>
    <div v-if="isLoadFail" :class="['empty-image', emptyImageClass]" />
    <BaseLoadingIndicator
      :size="emptyType === 'portrait' ? 96 : 48"
      :bg-bright="'light'"
      :fill="true"
      :class="[
        'loading-indicator',
        { done: isLoadDone }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from 'vue'
import BaseLoadingIndicator from '@/components/base/LoadingIndicator.vue'

type Ratio =
    | '16:9'
    | '15:8'
    | '1:1'
    | '2:1'
    | '3:2'
    | '4:1'
    | '4:3'
    | '4:5'
    | '3:4'
    | '3:5'
    | '5:1'
type EmptyType =
    | 'default'
    | 'portrait'
    | 'magnifier'

export default defineComponent({
  name: 'ImageContainer',
  components: {
    BaseLoadingIndicator
  },
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    ratio: {
      type: String as PropType<Ratio>,
      default: '4:3'
    },
    emptyType: {
      type: String as PropType<EmptyType>,
      default: 'default'
    },
    isFillContainer: {
      type: Boolean,
      default: false
    },
    stroke: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ratioClass = computed(() => `ratio-${String(props.ratio).replace(':', 'x')}`)
    const emptyImageClass = computed(() => props.emptyType.toLowerCase())
    const isTimeout = ref(false)
    const isLoadFail = ref(false)
    const isLoadDone = ref(false)

    const handleOnLoadFail = (evt: Event) => {
      isLoadDone.value = true
      isLoadFail.value = true
      ;(evt.target as HTMLImageElement).style.display = 'none'
    }
    const handleOnLoadDone = (evt: Event) => {
      isLoadDone.value = true
      isLoadFail.value = false
      ;(evt.target as HTMLImageElement).style.display = 'block'
    }

    onMounted(() => {
      setTimeout(() => {
        if (!isLoadDone.value) {
          isTimeout.value = true
          isLoadDone.value = true
          isLoadFail.value = true
        }
      }, 8000)
    })

    return {
      ratioClass,
      emptyImageClass,
      isLoadFail,
      isLoadDone,
      handleOnLoadFail,
      handleOnLoadDone
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.image-container {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  padding: 0;
  overflow: hidden;
  background-color: inherit;

  &::before {
    display: block;
    content: '';
    padding-top: 56.25%;
  }

  &.ratio-16x9::before { padding-top: 56.25%; }
  &.ratio-15x8::before { padding-top: 53.33333333%; }
  &.ratio-1x1::before { padding-top: 100%; }
  &.ratio-2x1::before { padding-top: 50%; }
  &.ratio-3x2::before { padding-top: 66.6666666667%; }
  &.ratio-4x1::before { padding-top: 25%; }
  &.ratio-4x3::before { padding-top: 75%; }
  &.ratio-4x5::before { padding-top: 125%; }
  &.ratio-3x4::before { padding-top: 133.3333333333%; }
  &.ratio-3x5::before { padding-top: 166.6666666667%; }
  &.ratio-5x1::before { padding-top: 20%; }

  &.fill-container {
    height: 100%;
    &::before { padding-top: 100%; }
  }

  > img {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .empty-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.portrait {
      width: 100%;
      height: 100%;
      background-color: $color-bg-1;
      background-size: 24px auto;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('@/assets/images/empty-image-portrait.svg');
    }

    &.default {
      width: 36px;
      height: 36px;
      background-size: 100%;
      background-image: url('@/assets/images/empty-image-default.svg');
    }

    &.magnifier{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &::after {
        content: '\e97d';
        font-family: 'lmnova';
        font-size: 24px;
      }
    }
  }

  .loading-indicator {
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-bg-1;

    &.done { opacity: 0 }
  }
}
</style>
