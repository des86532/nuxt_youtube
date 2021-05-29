<template lang="pug">
  .h-full.bg-gray-700.transition-width.duration-300.relative.pb-14(:class="isSidebarOpen ? 'w-60' : 'w-0'")
    .overflow-auto.h-full
      p hello 
      p hello 
      p hello 
    .w-full.h-14.border-t.text-center.text-white.absolute.bottom-0.flex.justify-center.items-center.cursor-pointer(@click="logout")
      span 登出
</template>

<script>
export default {
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen
    }
  },

  methods: {
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>