import { Message } from "element-ui"

export const state = () => ({
  token: '',
})

export const actions = {
  async login({ dispatch, commit }, data) {
    await this.$axios.$post('/login', data).then((res) => {
      localStorage.token = res.data.token
      commit('auth/setToken', res.data.token , { root: true })
    })
    await dispatch('user/getUserInfo', {}, { root: true })
    $nuxt.$router.replace({ name: 'index' })
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
            // get access_token 用來取得需要個人信息的資料
            // console.log(auth2.currentUser.get().getAuthResponse().access_token)
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

  logout({ commit }) {
    commit('removeToken')
    commit('toggleSidebar', false, { root: true })
  },
}

export const mutations = {
  setToken(state, token) {
    state.token = token ? token : ''
  },
  removeToken(state) {
    state.token = ''
    localStorage.removeItem('token')
  }
}