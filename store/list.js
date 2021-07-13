import { Message } from "element-ui"
import qs from 'qs'
const API_KEY = 'AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4'

export const state = () => ({
  favoriteList: {},
})

export const mutations = {
  setFavoriteList(state, payload) {
    state.favoriteList = payload
  }
}

export const actions = {
  async getVideoList({ commit }, pageToken) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('https://www.googleapis.com/youtube/v3/videos', {
        headers: {
          Authorization: '',
        },
        params: {
          part: ['contentDetails', 'liveStreamingDetails', 'localizations', 'player' ,'recordingDetails' , 'snippet', 'statistics', 'status'],
          chart: 'mostPopular',
          regionCode: 'tw',
          maxResults: 20,
          key: API_KEY,
          pageToken
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      }).then((res) => {
        resolve(res)
      })
    })
  },

  async getSearchList({ commit }, { searchText, pageToken }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('https://www.googleapis.com/youtube/v3/search', {
        headers: {
          Authorization: '',
        },
        params: {
          part: 'snippet',
          key: API_KEY,
          q: searchText,
          regionCode: 'tw',
          maxResults: 20,
          pageToken
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      }).then((res) => {
        resolve(res)
      })
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
        maxResults: 20,
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