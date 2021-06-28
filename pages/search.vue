<template lang="pug">
  .grid.grid-cols-1.gap-x-2.px-6.pt-10.overflow-auto.max-w-5xl.my-0.mx-auto(class="tablet:block pad:grid-cols-2")
    template(v-if="list.items.length > 0")
      RowCard.mb-4(v-for="video in list.items" :key="video.id.videoId" :video="video" @click="goWatch(video.id.videoId)")
    template(v-else)
      span 沒有資料
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
  computed: {
    list() {
      return this.$store.state.list.searchList
    }
  },
  methods: {
    goWatch(id) {
      $nuxt.$router.push({ name: 'watch', query: { id } })
    }
  },
  async fetch({ store, route }) {
    await store.dispatch('list/getSearchList', route.query.v)
  }
}
</script>