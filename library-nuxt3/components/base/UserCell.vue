<template>
  <ClientOnly>
    <div
      :class="[
      'user-cell',
      { on: slots['user-panel'] && onUserPanel },
      { responsive }
    ]"
    >
      <div
        :class="['user-info-wrap', { 'click-able': slots['user-panel'] }]"
        @click="handleOnToggleUserPanel"
      >
        <div class="user-info">
          <BasePortraitContainer
            :image-url="portrait"
            :size="'sm'"
          />

          <div class="user-name-wrap">
            <span class="user-name">{{userName}}</span>

            <div v-if="lock" class="lock">
              <BaseIcon
                :icon="{ type: 'outline', name: 'lock' }"
                :size="14"
                class="icon"
              />
            </div>
          </div>
        </div>

        <BaseIcon
          v-show="slots['user-panel']"
          :icon="{ type: 'outline', name: 'carrot-bottom' }"
          :size="20"
          class="user-panel-indicator"
        />
      </div>

      <slot name="user-panel" />
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue'
import BasePortraitContainer from '@/components/base/PortraitContainer.vue'
import BaseIcon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'BaseUserCell',
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
    },
    lock: {
      type: Boolean,
      default: false
    },
    onUserPanel: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleShowPanel'],
  setup(_props, { emit }) {
    const slots = useSlots()

    const handleOnToggleUserPanel = () => {
      emit('toggleShowPanel')
    }

    return { slots, handleOnToggleUserPanel }
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

  &.on {
    > .user-info-wrap > .user-panel-indicator {
      transform: rotate(180deg);
    }
  }

  .user-info-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    &.click-able {
      cursor: pointer;
    }

    > .user-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .user-name-wrap {
        display: flex;
        align-items: center;
        gap: 6px;

        .user-name {
          flex-grow: 1;
          @include ellipsis(1);
          @include text-style($text-body-14-bold);
        }

        .lock {
          flex-shrink: 0;
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

    .user-panel-indicator {
      color: $color-text-4;
      @include transition(transform .2s ease-in-out);
    }
  }

  @include tablet {
    &.responsive {
      > .user-info-wrap {
        > .user-info {
          .user-name-wrap { display: none; }
        }

        > .user-panel-indicator {
          display: none !important;
        }
      }
    }
  }

  @include mobile {
    &.responsive {
      > .user-info-wrap {
        > .user-info {
          .portrait-container {
            width: 25px;
            height: 25px;
          }
          > .user-name-wrap { display: none; }
        }
      }
    }
  }
}
</style>
