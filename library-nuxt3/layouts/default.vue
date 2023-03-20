<template>
  <div class="wrapper">
    <LayoutHeader />
    <LayoutMain :page-mode="true">
      <template #center>
        <slot />
      </template>
    </LayoutMain>
    <LayoutFooter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from '~~/components/layout/LayoutHeader.vue'
import LayoutFooter from '~~/components/layout/LayoutFooter.vue'
import LayoutMain from '@/components/layout/LayoutMain.vue'

export default defineComponent({
  name: 'LayoutOneColumn',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutFooter
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';


.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: $color-secondary-green-dark-20
}

</style>
