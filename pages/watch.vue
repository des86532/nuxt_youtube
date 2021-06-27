<template lang="pug">
  client-only(placeholder="Loading...")
    youtube(host="https://www.youtube-nocookie.com" :video-id="videoId")
</template>

<script>
export default {
  layout: 'admin',
  name: 'Watch',
  data() {
    return {
      videoId: '',
    }
  },
  fetch() {
    this.videoId = this.$route.query.id
  }
}
</script>