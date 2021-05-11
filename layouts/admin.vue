<template lang="pug">
  div
    Header
    .flex
      Sidebar
      Nuxt
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Header,
        Sidebar
    }
}
</script>