<template lang="pug">
  .relative.h-screen
    Header
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
}
</script>