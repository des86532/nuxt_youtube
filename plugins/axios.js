import { Message } from "element-ui"

export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    // if (process.browser && localStorage.token) {
    //   config.headers.Authorization = `Bearer ${localStorage.token}`
    // }
  })

  $axios.onResponse(response => {
    const { code } = response.data

    switch (code) {
      case 400:
        Message.error(error.message)
      break;

      case 401:
        store.dispatch('auth/logout')
        Message.error('請重新登入')
        redirect('/login')
      break;

      case 403:
        store.dispatch('auth/logout')
        Message.error('請重新登入')
        redirect('/login')
      break;

      default:
        if (code !== 200 && code !== undefined) {
          Promise.reject(response.data)
        }
      break;
    }
  })

  $axios.onError(error => {
    console.log(error)
  })
}