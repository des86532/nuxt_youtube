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
    await this.$axios.$get('/user').then(async (res) => {
      await commit('setUserInfo', res.data)
    })
  },
}