export default {
  // nuxtServerInit ({ commit }, { req }) {
  //   // if (req.session.user) {
  //   //   commit('user', req.session.user)
  //   // }
  //   // console.log(req)
  // },
  login({ commit }, data) {
    console.log(data)
    this.$axios.$post('/api/login').then((res) => {
      console.log(res);
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

          this.$axios.$post('/api/googleLogin', {
            client_id,
            token
          }).then((res) => {
            $nuxt.$router.push({ name: 'index' })
          })
        })
      break;
    }
  },
}