<template>
  <div class="user-cell">
    <BasePortraitContainer :image-url="portrait" :size="'sm'" />
    <div class="user-info">
      <span class="user-name">{{userName}}</span>
      <button class="lock">
        <BaseIcon class="icon" :icon="{ type: 'outline', name: 'comment' }" :size="8" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePortraitContainer from '@/components/base/PortraitContainer.vue'
import BaseIcon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'ComponentTemplate',
  components: {
    BasePortraitContainer,
    BaseIcon
  },
  props: {
    portrait: {
      required: true,
      type: String
    },
    userName: {
      required: true,
      type: String
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

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;

  .user-info {
    display: flex;
    align-items: center;
    gap: 6px;

    .user-name {
      @include text-style($text-body-14-bold);
    }

    .lock {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background-color: $color-secondary-blue-light-10;

      .icon {
        color: $color-secondary-blue-light-80;
      }
    }
  }
}
</style>
