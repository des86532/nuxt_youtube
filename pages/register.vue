<template lang="pug">
  .text-center.relative.my-0.mx-auto.transform(class="top-1/2 w-1/2 -translate-y-1/2")
    h1.text-5xl.pb-10 註冊
    .inline-block.w-full
      form.block.text-lg(@submit.prevent="submit")
        .block.border.mb-4
          input.w-full.h-full.p-4(type="text" placeholder="請輸入帳號" v-model="form.account" required)
        .block.border.mb-4
          input.w-full.h-full.p-4(type="password" placeholder="請輸入密碼" v-model="form.password" required)
        .flex.border.mb-4
          input.w-full.h-full.p-4(type="text" placeholder="請輸入驗證碼" v-model="form.verifyCode" required)
          div(v-html="captcha" @click="changeCaptcha")
        .block.border.mb-4
          input.w-full.h-full.p-4(type="text" placeholder="請輸入姓名" v-model="form.username" required)
        .block.border.mb-4
          input.w-full.h-full.p-4(type="email" placeholder="請輸入信箱" v-model="form.email" required)
        .block
          Button.mb-4.w-full.bg-red-600(type="submit" text="送出")
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
        verifyCode: '',
        username: '',
        email: '',
      },
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('auth/register', this.form);
    },
    async changeCaptcha() {
      const result = await this.$axios.$get('/captcha')
      this.captcha = result.data
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get('/captcha')
    return { captcha: res.data }
  }
}
</script>