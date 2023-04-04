<template>
  <div class="search">
    <div class="input-wrap">
      <input
        :value="$props.value"
        :placeholder="$props.placeHolder"
        @input="$emit('update:value', $event.target.value)"
      />

      <button type="button" class="btn-search">
        <i class="material-icons-outlined">search</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseSearch',
  props: {
    value: {
      required: true,
      type: String
    },
    placeHolder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup() {
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';
@import '@/assets/styles/abstracts/variables.scss';

$search-height: 36px;
$search-max-width: 316px;

.search {
  display: flex;
  flex-direction: row;
  height: $search-height;
  width: 100%;
  max-width: $search-max-width;
  padding: 0 12px;
  border-radius: calc($search-height / 2);
  background-color: $color-white;
  color: $color-black-30p;

  &:hover {
    color: $color-black-50p;
  }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;

    > input {
      flex-grow: 1;
      width: 100%;
      line-height: 22px;
      @include transition(all .15s ease-in-out);

      &:not(:placeholder-shown) {
        color: $color-black-70p;

        + .btn-search > i {
          color: $color-black-70p;
        }
      }
    }

    .btn-search {
      flex-shrink: 0;
      font-size: 0;

      > i {
        font-size: 20px;
        @include transition( all .15s ease-in-out);
      }
    }
  }
}
</style>