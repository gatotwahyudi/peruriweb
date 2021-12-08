export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BIMTEK PERURI',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/bootstrap.bundle.min.js', body: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/bootstrap.min.css'
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'data.access_token',
          global: true,
          // required: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'data.refresh_token', // property JSON response dari backend yang mengandung access_token
          data: 'refresh_token', // to set the name of the property you want to send in the request
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          // Non Proxy
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/me', method: 'get' }
        }
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Non Proxy - aktifkan baseURL
    //baseURL: 'http://localhost:8055'

    // Proxy Mode - hanya boleh gunakan prefix agar tidak menambahi manual ke setiap request
    proxy: true,
    prefix: '/api/'
  },

  proxy: {
    '/api/': { target: process.env.BASE_URL, pathRewrite: {'^/api/': '/'} }
  },
    
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: process.env.NODE_ENV === 'production' ? process.env.PORT_PRO : process.env.PORT_DEV, // default: 3000
    host: 'localhost',
    timing: false // server timing info in header
  }
}
