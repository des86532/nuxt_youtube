<template lang="pug">
.z-10.overflow-hidden.transition-width.duration-150(:class="[isSidebarOpen ? isMobile ? 'w-full' : 'w-auto' : 'w-0', isMobile ? 'mobile-sidebar': '']")
  template(v-if="isMobile")
    .h-full.bg-gray-900.bg-opacity-80.relative.pt-14.z-10.w-full
      .overflow-auto.h-full.text-center
        nuxt-link.block.text-white.p-6.whitespace-nowrap.text-2xl(class="hover:text-red-400" :class="[{'text-red-400': link.key === $nuxt.$route.name }]" v-for="link in links" :key="link.key" :to="link.url") {{ link.name }} 
        .block.text-white.p-6.whitespace-nowrap.text-2xl(@click="logout") 
          span 登出
        .block.text-4xl.text-white.pt-6(@click="closeSidebar")
          i.far.fa-times-circle
  template(v-else)
    .h-full.bg-gray-700.relative.pb-14.z-10.w-48
      .overflow-auto.h-full
        nuxt-link.block.text-red-400.py-2.px-6.whitespace-nowrap(class="hover:bg-gray-300" :class="[{'bg-gray-300': link.key === $nuxt.$route.name }]" v-for="link in links" :key="link.key" :to="link.url") {{ link.name }} 
      .w-full.h-14.border-t.text-center.text-white.absolute.bottom-0.flex.justify-center.items-center.cursor-pointer(@click="logout")
        span 登出
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      links: [
        {
          name: '首頁',
          key: 'index',
          url: '/',
        },
        {
          name: '我的最愛',
          key: 'favorite',
          url: '/favorite',
        }
      ],
    }
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen
    },
  },

  methods: {
    closeSidebar() {
      this.$store.commit('toggleSidebar', false)
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-sidebar {
    height: calc(100% - 3.5rem);
    position: fixed;
    display: flex;
  }
</style>