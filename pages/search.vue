<template lang="pug">
  .grid.grid-cols-1.gap-x-2.px-6.pt-10.overflow-auto.max-w-5xl.my-0.mx-auto(class="tablet:block pad:grid-cols-2")
    template(v-if="videoList.length > 0")
      RowCard.mb-4(v-for="(video, index) in videoList" :key="index" :video="video" v-show="video.snippet.liveBroadcastContent === 'none'" @click="goWatch(video.id.videoId)")
    template(v-else)
      span 沒有資料
    #infinite-detective
</template>

<script>
import RowCard from '@/components/RowCard.vue'

export default {
  layout: 'admin',
  name: 'search',
  components: {
    RowCard,
  },
  middleware({ store }) {
    store.commit('toggleSidebar', false)
  },
  watchQuery: true,
  methods: {
    goWatch(id) {
      this.$router.push({ name: 'watch', query: { id } })
    },
    async nextPage() {
      const { nextPageToken, items } = await this.$store.dispatch('list/getSearchList', {
        searchText: this.$route.query.v,
        pageToken: this.nextPageToken
      })
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

        if (this.videoList.length >= this.pageInfo.totalResults || this.videoList.length === 0) {
          observer.unobserve(target)
        }
      })

      observer.observe(target)
    }
  },
  mounted() {
    this.observer()
  },
  async asyncData({ store, route }) {
    const { items, nextPageToken, pageInfo } = await store.dispatch('list/getSearchList', {
      searchText: route.query.v
    })
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