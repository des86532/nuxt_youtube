<template lang="pug">
  .grid.grid-cols-1.pt-8.px-6.gap-x-4.gap-y-6(class="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4")
    client-only(placeholder="loading")
      Card(v-for="video in videoList.items" :key="video.id" :video="video" @click="goWatch(video.id)" @addLike="updateLikeStatus(video.id)" :liked="checkLiked(video.id)")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  layout: 'admin',
  components: {
    Card,
  },
  data() {
    return {
      videoList: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    checkLiked(id) {
      if (this.userInfo.likeList) {
        return this.userInfo.likeList.includes(id)
      }
      return false
    },
    goWatch(id) {
      $nuxt.$router.push({ name: 'watch', query: { id } })
    },
    updateLikeStatus(id) {
      this.$store.dispatch('list/updateVideoFavorite', id)
    },
  },
  async asyncData({ store }) {
    const data = await store.dispatch('list/getVideoList')
    return { videoList: data }
  },
}
</script>