export const state = () => ({
  isSidebarOpen: false,
})

export const actions = {
  async nuxtServerInit ({ commit }) {
  },
}

export const mutations = {
  toggleSidebar(state, type) {
    state.isSidebarOpen = type
  },
}