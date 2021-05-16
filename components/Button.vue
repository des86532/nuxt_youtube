<template lang="pug">
  button.rounded.border.outline-none.py-3.text-white(type="text") {{ text }}
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: '123',
    }
  }
}
</script>