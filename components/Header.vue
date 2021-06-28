<template lang="pug">
  .header.bg-gray-700.h-14.flex.justify-between.items-center.px-4.fixed.w-full
    .left-nav.cursor-pointer
      slot(name="left")
        .nav.px-2(@click="toggleSidebar")
          i.fas.fa-bars.text-2xl.text-gray-100
        .logo
    .center-nav.flex-auto.mx-2
      slot(name="center")
        .search-bar
          input.w-full.outline-none.px-2.rounded-sm.bg-gray-700.border.border-gray-100.placeholder-gray-400.caret-white.text-white(type="text" v-model="searchText" placeholder="搜尋" class="py-0.5" @keyup.enter="onSearch")
    .right-nav.px-2.cursor-pointer
      client-only
        slot(name="right")
          avatar(:username="username" :size="32" v-if="isLogin")
          nuxt-link.text-black.bg-yellow-50.p-1(to="/login" v-else) 登入
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  components: {
    avatar: Avatar
  },
  props: {
    username: {
      type: String,
      require: false,
    }
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.token.length > 0
    },
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar', !this.isSidebarOpen)
    },
    onSearch() {
      if (this.$route.name === 'search') {
        this.$store.dispatch('list/getSearchList', this.searchText)
      } else {
        $nuxt.$router.push({ name: 'search', query: { v: this.searchText }})
      }
    }
  },
}
</script>