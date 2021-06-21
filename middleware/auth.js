import { Message } from "element-ui"

export default function ({ store, redirect }) {
  if (process.client) {
    // if (!store.state.auth.token) {
    //   store.dispatch('auth/logout')
    //   Message.error('請重新登入')
    //   redirect('/login')
    // }
  }
}
