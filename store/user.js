export const state = () => ({
  userInfo: {},
})

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = Object.assign({}, payload)
  }
}

export const actions = {
  async getUserInfo({ commit }) {
    this.$axios.setToken(localStorage.token, 'Bearer')
    await this.$axios.$get('/user').then(async (res) => {
      await commit('setUserInfo', res.data)
    })
  },

  async refreshUserInfo({ commit }) {
    await this.$axios.$get('/user').then((res) => {
      commit('setUserInfo', res.data)
    })
  },
}