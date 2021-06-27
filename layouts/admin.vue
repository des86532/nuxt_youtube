<template lang="pug">
  .relative.h-screen
    Header(:username="userInfo.username" v-if="!$fetchState.pending")
    .flex.flex-grow.h-full.pt-14
      Sidebar
      Nuxt.h-full.w-full.overflow-auto
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar
  },

  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },

  async fetch() {
    if (localStorage.token) {
      await this.$store.commit('auth/setToken', localStorage.token)
      await this.$store.dispatch('user/getUserInfo')
      await this.$store.dispatch('list/getFavoriteList')
    }
  },
  fetchOnServer: false,
}
</script>