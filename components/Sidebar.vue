<template lang="pug">
  .h-full.bg-gray-700.transition-width.duration-300.relative.pb-14(:class="isSidebarOpen ? 'w-60' : 'w-0'")
    .overflow-auto.h-full
      nuxt-link.block.text-red-400.py-2.px-6.whitespace-nowrap(class="hover:bg-gray-300" :class="[{'bg-gray-300': link.key === $nuxt.$route.name }]" v-for="link in links" :key="link.key" :to="link.url") {{ link.name }} 
    .w-full.h-14.border-t.text-center.text-white.absolute.bottom-0.flex.justify-center.items-center.cursor-pointer(@click="logout")
      span 登出
</template>

<script>
export default {
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
      ]
    }
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  },
}
</script>