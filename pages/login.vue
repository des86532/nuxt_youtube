<template lang="pug">
  .text-center.relative.my-0.mx-auto(class="top-1/4 w-1/2")
    .inline-block
      form.block.text-lg(@submit.prevent="login")
        .block.border.mb-4
          input.w-full.h-full.p-4(id="account" type="text" placeholder="請輸入帳號" v-model="form.account" required)
        .block.border.mb-4
          input.w-full.h-full.p-4(id="password" type="password" placeholder="請輸入密碼" v-model="form.password" required)
        .block
          Button.mb-4.w-full.bg-red-600(type="submit" text="登入")
          Button.mb-4.w-full.bg-yellow-800(text="註冊" @click="register")
      .block.text-2xl
        Button(v-for="item in socials" :key="item.name" :ref="item.id" :text="item.name" class="w-1/2" :class="item.class" @click="thirdLogin(item.name)")
</template>

<script>
import Button from '@/components/Button.vue'

const socials = [
  {
    name: 'google',
    id: 'google-btn',
    class: 'bg-green-600',
  },
  {
    name: 'facebook',
    id: 'google-btn',
    class: 'bg-blue-500',
  },
  {
    name: 'github',
    id: 'google-btn',
    class: 'bg-black',
  },
  {
    name: 'twitter',
    id: 'google-btn',
    class: 'bg-indigo-800',
  },
]

export default {
  components: {
    Button,
  },
  data() {
    return {
      socials,
      form: {
        account: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.form);
    },
    thirdLogin(type) {
      this.$store.dispatch('auth/thirdLogin', type);
    },
    register() {
      $nuxt.$router.push({ name: 'register' })
    }
  },
}
</script>