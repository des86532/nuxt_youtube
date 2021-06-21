import qs from 'qs'
const API_KEY = 'AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4'

export const state = () => ({
  videoList: {},
})

export const mutations = {
  setVideoList(state, payload) {
    state.videoList = payload
  }
}

export const actions = {
  async getVideoList({ commit }) {
    await this.$axios.$get('https://www.googleapis.com/youtube/v3/videos', {
      headers: {
        Authorization: '',
      },
      params: {
        part: ['contentDetails', 'liveStreamingDetails', 'localizations', 'player' ,'recordingDetails' , 'snippet', 'statistics', 'status'],
        chart: 'mostPopular',
        maxResults: 50,
        key: API_KEY,
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    }).then((res) => {
      commit('setVideoList', res)
    })
  },
}