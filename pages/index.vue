<template lang="pug">
  .flex.justify-start.flex-wrap.pt-8
    .mx-4.mb-8(v-for="video in videoList.items" :key="video.tag")
      Card(:thumbnails="video.snippet.thumbnails")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  layout: 'admin',
  components: {
    Card,
  },
  computed: {
    videoList() {
      return this.$store.state.list.videoList
    }
  },
  async fetch() {
    await this.$store.dispatch('list/getVideoList')
  },
}
</script>