<template>
  <div @click="test">
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
    <Logo />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  methods: {
    test() {
      $nuxt.$router.push({ name: 'login' })
    }
  }
}
</script>