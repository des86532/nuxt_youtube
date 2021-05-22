import { $axios } from '~/utils/api'

export default {
  // nuxtServerInit ({ commit }, { req }) {
  //   // if (req.session.user) {
  //   //   commit('user', req.session.user)
  //   // }
  //   // console.log(req)
  // },
  login({ commit }: any, data: any) {
    $axios.post('/api/login').then((res) => {
      console.log(res);
    })
  },

  thirdLogin() {

  },
}