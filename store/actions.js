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

  thirdLogin({ commit }, data) {
    console.log(data)
  },
}