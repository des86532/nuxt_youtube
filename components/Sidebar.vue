<template lang="pug">
  .z-10.sidebar.w-full
    template(v-if="isMobile")
      .h-full.bg-gray-900.bg-opacity-80.transition-width.duration-150.relative.pt-14.z-10(:class="isSidebarOpen ? 'w-full' : 'w-0'")
        .overflow-auto.h-full.text-center
          nuxt-link.block.text-white.p-6.whitespace-nowrap.text-2xl(class="hover:text-red-400" :class="[{'text-red-400': link.key === $nuxt.$route.name }]" v-for="link in links" :key="link.key" :to="link.url") {{ link.name }} 
          .block.text-white.p-6.whitespace-nowrap.text-2xl(@click="logout") 
            span 登出
          .block.text-4xl.text-white.pt-6(@click="closeSidebar")
            i.far.fa-times-circle
    template(v-else)
      .h-full.bg-gray-700.transition-width.duration-150.relative.pb-14.z-10(:class="isSidebarOpen ? 'w-48' : 'w-0'")
        .overflow-auto.h-full
          nuxt-link.block.text-red-400.py-2.px-6.whitespace-nowrap(class="hover:bg-gray-300" :class="[{'bg-gray-300': link.key === $nuxt.$route.name }]" v-for="link in links" :key="link.key" :to="link.url") {{ link.name }} 
        .w-full.h-14.border-t.text-center.text-white.absolute.bottom-0.flex.justify-center.items-center.cursor-pointer(@click="logout")
          span 登出
      .h-full.flex-1.bg-gray-400.bg-opacity-70.absolute.w-screen(v-if="isSidebarOpen" @click="closeSidebar")
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
  .sidebar {
    height: calc(100% - 3.5rem);
    position: fixed;
    display: flex;
  }
</style>