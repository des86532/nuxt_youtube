import { Message } from "element-ui"

export const state = () => ({
  token: '',
})

export const actions = {
  async login({ dispatch, commit }, data) {
    await this.$axios.$post('/login', data).then(async (res) => {
      if (res.code === 200) {
        localStorage.token = res.data.token
        commit('auth/setToken', res.data.token , { root: true })
        await dispatch('user/getUserInfo', {}, { root: true })
        $nuxt.$router.replace({ name: 'index' })
      }
    })
  },

  thirdLogin({ dispatch, commit }, type) {
    switch (type) {
      case 'google':
        const client_id = '748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com'
        let token;
        gapi.load('auth2', async () => {
          let auth2 = await gapi.auth2.init({
            prompt: 'select_account',
            client_id,
            // Scopes to request in addition to 'profile' and 'email'
            scope: 'profile'
          })

          await auth2.signIn().then(function(res) {
            token = auth2.currentUser.get().getAuthResponse().id_token;
          });

          const result = await this.$axios.$post('/googleLogin', {
            client_id,
            id_token: token
          })

          localStorage.token = result.data.token
          commit('auth/setToken', result.data.token , { root: true })

          await dispatch('user/getUserInfo', {}, { root: true })
          $nuxt.$router.replace({ name: 'index' })
        })
      break;
    }
  },

  async register({ dispatch }, data) {
    const { account, password } = data
    const { code: isAvailable } = await this.$axios.$get('/checkAccount', { params: { account }})
    if (isAvailable === 200)  {
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