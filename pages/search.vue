<template lang="pug">
  .block.px-6.pt-10.overflow-auto
    RowCard.mb-4(v-for="video in list.items" :key="video.id.videoId" :video="video" @click="goWatch(video.id.videoId)")
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
  methods: {
    goWatch(id) {
      $nuxt.$router.push({ name: 'watch', query: { id } })
    }
  },
  async asyncData({ store, route }) {
    const data = await store.dispatch('list/getSearchList', route.query.v)
    return { list: data }
  }
}
</script>