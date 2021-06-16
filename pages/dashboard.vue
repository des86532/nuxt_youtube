<template lang="pug">
  h1 {{ list }}
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const res = await $axios.$get('/users')
    return { list: res.data }
  },
}
</script>