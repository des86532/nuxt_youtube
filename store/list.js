import { Message } from "element-ui"
import qs from 'qs'
const API_KEY = 'AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4'

export const state = () => ({
  videoList: {},
  searchList: {},
  favoriteList: {},
})

export const mutations = {
  setVideoList(state, payload) {
    state.videoList = payload
  },
  setSearchList(state, payload) {
    state.searchList = payload
  },
  setFavoriteList(state, payload) {
    state.favoriteList = payload
  }
}

export const actions = {
  async getVideoList({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('https://www.googleapis.com/youtube/v3/videos', {
        headers: {
          Authorization: '',
        },
        params: {
          part: ['contentDetails', 'liveStreamingDetails', 'localizations', 'player' ,'recordingDetails' , 'snippet', 'statistics', 'status'],
          chart: 'mostPopular',
          regionCode: 'tw',
          maxResults: 50,
          key: API_KEY,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      }).then((res) => {
        commit('setVideoList', res)
        resolve(res)
      })
    })
  },

  async getSearchList({ commit }, searchText) {
    await this.$axios.$get('https://www.googleapis.com/youtube/v3/search', {
      headers: {
        Authorization: '',
      },
      params: {
        part: 'snippet',
        key: API_KEY,
        q: searchText,
        regionCode: 'tw',
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    }).then((res) => {
      commit('setSearchList', res)
    })
  },

  async getFavoriteList({ rootState, commit }) {
    await this.$axios.$get('https://www.googleapis.com/youtube/v3/videos', {
      headers: {
        Authorization: '',
      },
      params: {
        id: rootState.user.userInfo.likeList,
        part: ['contentDetails', 'liveStreamingDetails', 'localizations', 'player' ,'recordingDetails' , 'snippet', 'statistics', 'status'],
        regionCode: 'tw',
        maxResults: 50,
        key: API_KEY,
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    }).then((res) => {
      commit('setFavoriteList', res)
    })
  },

  async updateVideoFavorite({ rootState, dispatch }, id) {
    if (!rootState.auth.token) {
      Message.error('請先登入')
      return $nuxt.$router.push({ name: 'login' })
    }

    if (rootState.user.userInfo.likeList.includes(id)) {
      const result = await this.$axios.$delete('/updateFavoriteList', { params: { id }})
      if (result.code === 200) {
        Message.info('刪除成功')
      }
    } else {
      const result = await this.$axios.$get('/updateFavoriteList', { params: { id }})
      if (result.code === 200) {
        Message.success('添加成功')
      }
    }

    await dispatch('user/refreshUserInfo', {}, { root: true })
    await dispatch('getFavoriteList')
  }
}