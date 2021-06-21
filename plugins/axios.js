import { Message } from "element-ui"

export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    // console.log(config)
    // if (process.browser && localStorage.token) {
    //   config.headers.Authorization = `Bearer ${localStorage.token}`
    // }
  })

  $axios.onResponse(response => {
    if (response.data.code === 400) {
      return Promise.reject(response.data)
    }
  })

  $axios.onError(error => {
    if (error.code === 400) {
      Message.error(error.message)
    } else if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch('auth/logout')
      Message.error('請重新登入')
      redirect('/login')
    }
  })
}