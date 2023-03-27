<template>
  <header class="header">
    <div class="inner">
      <NuxtLink to="/"><h1 class="logo">Ella's DEV</h1></NuxtLink>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutHeader',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/variables.scss';
@import '@/assets/styles/abstracts/functions.scss';
@import '@/assets/styles/abstracts/mixin.scss';

.header {
  width: 100%;
  background: $color-secondary-green-dark-50;
  color: $color-white;
  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 960px;
    margin: auto;
    padding: 12px 24px;
  }
  .logo{
    @include text-style($text-heading1-bold);
  }

  .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 32px;

    li {
      @include text-style($text-heading3-bold);
      text-decoration: none;
    }
  }
}

</style>