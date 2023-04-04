<template>
  <i
    :class="['lmnova', $props.icon.type, $props.icon.name]"
    :style="{fontSize: String(size)+'px'}"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Type<T, I> {
  name: I,
  type: T
}

type Fills =
  | 'home' | 'comment' | 'rocket' | 'calendar' | 'profile' | 'reply' | 'share' | 'notification'
  | 'group' | 'sun' | 'facebook' | 'google' | 'twitter' | 'send' | 'settings' | 'leave'
  | 'dark' | 'post' | 'podcast' | 'fire' | 'growing' | 'report' | 'trouble' | 'message' | 'feedback'
  | 'inbox' | 'interviews' | 'follow' | 'business' | 'menu' | 'like'

type Outlines =
  | 'align-left' | 'align-right' | 'align-middle' | 'list-point' | 'list-number' | 'text-underline'
  | 'text-italic' | 'text-strikethrow' | 'text-code' | 'text-heading' | 'text-heading-1' | 'text-heading-2'
  | 'text-heading-3' | 'text-paragraph' | 'text-color' | 'text-color-picker' | 'text-bold' | 'search' | 'image-compact'
  | 'edit' | 'seo' | 'chev-right' | 'chev-left' | 'chev-top' | 'chev-bottom' | 'arrow-left' | 'arrow-right' | 'arrow-top'
  | 'arrow-bottom' | 'link' | 'share' | 'blogging' | 'bitcoin' | 'post' | 'tutorial' | 'design' | 'check' | 'web'
  | 'close' | 'mention' | 'more-horizontal' | 'more-vertical' | 'follow' | 'comment' | 'info' | 'view' | 'image-wide'
  | 'upload' | 'expand' | 'voice' | 'like' | 'new-mark' | 'new-badge' | 'following' | 'popular' | 'instagram' | 'facebook'
  | 'twitter' | 'linkedin' | 'checkbox-check' | 'checkbox-uncheck' | 'wallet' | 'image-compact-sm' | 'video' | 'clear'
  | 'search-fail' | 'profile' | 'grid'

export type IconType = Type<'fill', Fills> | Type<'outline', Outlines>

export default defineComponent({
  name: 'BaseIcon',
  props: {
    icon: {
      required: true,
      type: Object as PropType<IconType>
    },
    size: {
      type: Number,
      default: 20
    }
  },
  setup() {
    return {}
  }
})
</script>


<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';
</style>
