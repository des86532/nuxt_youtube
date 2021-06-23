<template lang="pug">
  .grid.grid-cols-1.pt-8.px-6.gap-x-4.gap-y-6(class="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4")
    Card(v-for="video in videoList.items" :key="video.tag" :video="video" @click="goWatch(video.id)" @add-like="addLike")
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
  methods: {
    goWatch(id) {
      $nuxt.$router.push({ name: 'watch' })
    },
    addLike() {
      console.log('222')
    },
  },
  async fetch() {
    await this.$store.dispatch('list/getVideoList')
  },
}
</script>