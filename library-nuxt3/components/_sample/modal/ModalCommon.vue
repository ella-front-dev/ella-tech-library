<template>
  <vue-final-modal v-model="value" name="test">
    <div class="modal-box">
      Base Modal
    </div>
  </vue-final-modal>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'ModalCommon',
  setup() {
    const value = ref(false).value

    return { value }
  }
})

</script>
<style lang="">
  
</style>