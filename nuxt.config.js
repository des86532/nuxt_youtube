export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt_youtube',
    htmlAttrs: {
      lang: 'en',
      itemscope: true,
      itemtype: 'http://schema.org/Article'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css' }
    ],
    script: [
      // google login
      // { src: '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js' },
      { src: 'https://apis.google.com/js/client:platform.js', async: true, defer: true }
    ]
  },

  loading: {
    color: 'red',
    height: '3px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/firebase.js' },
    { src: '~/plugins/youtube.js', mode: 'client' },
    { src: '~/plugins/nuxt-client-init.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // server
  server: {
    port: process.env.PORT || 8000,
  },

  router: {
  },

  serverMiddleware: {
    // API middleware
    '/': '@/server/index.js',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // plugins config
  tailwindcss: {
    // cssPath: '~/assets/css/tailwind.css',
    // configPath: 'tailwind.config.js',
    jit: true,
    // exposeConfig: false,
    // config: {}
    viewer: true,
  },

  axios: {
    baseURL: 'http://localhost:8000/api', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  env: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    // google & firebase
    apikey: process.env.APIKEY
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}