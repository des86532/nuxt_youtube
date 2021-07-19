<template lang="pug">
  .grid.grid-cols-1.pt-8.px-6.gap-x-4.gap-y-6(class="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4")
    client-only(placeholder="loading")
      Card(v-for="video in videoList" :key="video.id" :video="video" @click="goWatch(video.id)" @addLike="updateLikeStatus(video.id)" @external="external(video.id)" :liked="checkLiked(video.id)")
    #infinite-detective
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  layout: 'admin',
  components: {
    Card,
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
    external(id) {
      this.$store.commit('setFloatingWindow', id)
    },
    async nextPage() {
      const { nextPageToken, items } = await this.$store.dispatch('list/getVideoList', this.nextPageToken)
      this.nextPageToken = nextPageToken
      this.videoList = [...this.videoList, ...items]
    },
    observer() {
      const target = document.getElementById('infinite-detective')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            this.nextPage()
          }
        })

        if (this.videoList.length >= this.pageInfo.totalResults) {
          observer.unobserve(target)
        }
      })

      observer.observe(target)
    }
  },
  mounted() {
    this.observer()
  },
  async asyncData({ store }) {
    const { items, nextPageToken, pageInfo } = await store.dispatch('list/getVideoList')
    return { 
      videoList: items,
      nextPageToken: nextPageToken,
      pageInfo: pageInfo
    }
  },
}
</script>

<style lang="scss" scoped>
  #infinite-detective {
    width: 100%;
    height: 1px;
  }
</style>