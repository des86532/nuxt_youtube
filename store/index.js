export const state = () => ({
  isSidebarOpen: false,
})

export const actions = {
  async nuxtServerInit (store) {
  },
}

export const mutations = {
  toggleSidebar(state, type) {
    state.isSidebarOpen = type
  },
}