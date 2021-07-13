<template lang="pug">
  button.rounded.border.outline-none.py-3.text-white(type="text" :class="{ 'cursor-not-allowed bg-opacity-50': disabled }" @click="onClick") {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '123',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>