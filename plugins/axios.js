import { Message } from "element-ui"

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (process.browser && localStorage.token) {
      config.headers.Authorization = `Bearer ${localStorage.token}`
    }
  })

  $axios.onResponse(response => {
    if (response.data.code === 400) {
      return Promise.reject(response.data)
    }
  })

  $axios.onError(error => {
    const code = error.code
    if (code === 400) {
      Message.error(error.message)
    }
  })
}