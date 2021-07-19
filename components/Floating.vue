<template lang="pug">
  client-only(placeholder="Loading...")
    .w-80.fixed.bottom-2(:class="position === 'left' ? 'left-2' : 'right-2'" ref="dragItem" @dragend="onDragend" draggable)
      .w-full.h-8.bg-black.text-right
        .w-8.h-8.text-white.inline-flex.items-center.justify-center.cursor-pointer(@click="close")
          i.fas.fa-window-close
      youtube(v-if="videoId" host="https://www.youtube-nocookie.com" :video-id="videoId" :player-width="videoWidth" :player-height="videoHeight")
</template>

<script>
export default {
  name: 'floating',
  data() {
    return {
      position: 'left',
      videoWidth: '320',
      videoHeight: '180',
    }
  },
  computed: {
    videoId() {
      return this.$store.state.floatingWindowId
    }
  },
  methods: {
    onDragend(e) {
      const width = window.innerWidth
      if (e.pageX > width/2) {
        this.position = 'right'
      } else {
        this.position = 'left'
      }
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>