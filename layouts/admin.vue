<template lang="pug">
  .relative.h-screen
    Header(:username="userInfo.username")
    .flex.flex-grow.h-full.pt-14
      client-only
        Sidebar(:isMobile="isMobile")
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
    isMobile() {
      return this.$store.state.isMobile
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
  }
}
</script>