<template lang="pug">
client-only(placeholder="Loading...")
  .flex.justify-center
    youtube(host="https://www.youtube-nocookie.com" :video-id="videoId" :player-width="videoWidth" :player-height="videoHeight")
</template>

<script>
export default {
  layout: 'admin',
  name: 'Watch',
  middleware({ store }) {
    store.commit('toggleSidebar', false)
  },
  data() {
    return {
      videoId: '',
      videoWidth: '640',
      videoHeight: '360',
    }
  },

  methods: {
    onResize() {
      this.videoWidth = window.innerWidth >= 1200 ? 1120 : window.innerWidth < 720 ? window.innerWidth : window.innerWidth * 0.9;
      this.videoHeight = (this.videoWidth / 16) * 9;
    }
  },

  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  fetch() {
    this.videoId = this.$route.query.id
  }
}
</script>