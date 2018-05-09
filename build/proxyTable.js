// 开发时使用的重定向、转发、路径重写列表
// 仅在开发时需要使用，生产环境通过服务器配置解决，或者，不再存在跨域问题等。

const domain = {
  dev: '/'
}

const remote = domain.dev

module.exports = {
  '/product/**': {
    target: remote,
    secure: false,
    changeOrigin: true
  },
  '/api/data/**': {
    target: remote,
    secure: false,
    changeOrigin: true
  }
}
