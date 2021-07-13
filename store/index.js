export const state = () => ({
  isMobile: false,
  isSidebarOpen: false,
})

export const actions = {
  async nuxtClientInit({ dispatch, commit }) {
    await dispatch('checkIsMobile')

    if (localStorage.token) {
      try {
        await commit('auth/setToken', localStorage.token)
        await dispatch('user/getUserInfo')
        await dispatch('list/getFavoriteList')
      } catch(err) {
      }
    }
  },
  async nuxtServerInit (store) {
  },
  checkIsMobile({ commit }) {
    const isMobile = window.innerWidth < 640
    commit('setMobileStatus', isMobile)
    return Promise.resolve(isMobile)
  }
}

export const mutations = {
  toggleSidebar(state, type) {
    state.isSidebarOpen = type
  },
  setMobileStatus(state, boolean)  {
    state.isMobile = boolean
  }
}