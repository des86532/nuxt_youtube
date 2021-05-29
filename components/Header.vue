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
          input.w-full.outline-none.px-2.rounded-sm.bg-gray-700.border.border-gray-100.placeholder-gray-400.caret-white(type="text" v-model="searchText" placeholder="搜尋" class="py-0.5")
    .right-nav.px-2.cursor-pointer
      slot(name="right")
        avatar(username="Jane Doe" :size="32")
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar')
    }
  },
}
</script>