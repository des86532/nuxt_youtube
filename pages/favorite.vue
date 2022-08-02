<template lang="pug">
  .grid.grid-cols-1.pt-8.px-6.gap-x-4.gap-y-6(class="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4")
    client-only(placeholder="loading...")
      template(v-if="videoList.length === 0")
        span 沒有資料
      template(v-else)
        Card(v-for="video in videoList" :key="video.id" :video="video" @click="goWatch(video.id)" @addLike="updateLikeStatus(video.id)" liked)
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  layout: 'admin',
  components: {
    Card,
  },
  middleware: 'auth',
  computed: {
    videoList() {
      return this.$store.state.list.favoriteList
    }
  },
  methods: {
    goWatch(id) {
      $nuxt.$router.push({ name: 'watch', query: { id } })
    },
    updateLikeStatus(id) {
      this.$store.dispatch('list/updateVideoFavorite', id)
    },
  },

  mounted() {
    this.$store.dispatch('list/getFavoriteList')
  },
}
</script>