import { Message } from "element-ui"

export default {
  // nuxtServerInit ({ commit }, { req }) {
  //   // if (req.session.user) {
  //   //   commit('user', req.session.user)
  //   // }
  //   // console.log(req)
  // },
  login({ commit }, data) {
    this.$axios.$post('/login', data).then((res) => {
      localStorage.token = res.data.token
      $nuxt.$router.push({ name: 'index' })
    })
  },

  thirdLogin({ commit }, type) {
    switch (type) {
      case 'google':
        const client_id = '748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com'
        let token;
        gapi.load('auth2', async () => {
          let auth2 = await gapi.auth2.init({
            client_id,
            // Scopes to request in addition to 'profile' and 'email'
            scope: 'profile'
          })

          await auth2.signIn().then(function(res) {
            token = auth2.currentUser.get().getAuthResponse().id_token;
          });

          this.$axios.$post('/googleLogin', {
            client_id,
            token
          }).then((res) => {
            $nuxt.$router.push({ name: 'index' })
          })
        })
      break;
    }
  },

  async register({ dispatch }, data) {
    const { account, password } = data
    const { code: isAvailable } = await this.$axios.$get('/checkAccount', { params: { account }})
    if (isAvailable)  {
      const { code, message } = await this.$axios.$post('/register', data)
      if (code === 200) {
        Message.success('註冊成功')
        dispatch('login', {
          account,
          password
        })
      }
    }
  },
}