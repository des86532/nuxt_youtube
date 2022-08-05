<template lang="pug">
.relative.h-screen
  Header(:username="userInfo.username")
  .flex.flex-grow.h-full.pt-14
    client-only
      Sidebar(:isMobile="isMobile")
    Nuxt.h-full.w-full.overflow-auto
  FloatingWindow(v-if="!isMobile && showFloatingWindow" @close="closeFloating")
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import FloatingWindow from '@/components/Floating.vue';

export default {
  components: {
    Header,
    Sidebar,
    FloatingWindow
  },

  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    showFloatingWindow() {
      return this.$store.state.floatingWindowId
    }
  },
  methods: {
    closeFloating() {
      this.$store.commit('resetFloatingWindow')
    }
  }
}
</script>