const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/main', {
      target: 'https://acoe.co.kr/',
      changeOrigin: true,
    }),
  ),
    app.use(
      createProxyMiddleware('/admin', {
        target: 'https://acoe.co.kr/',
        changeOrigin: true,
      }),
    ),
    app.use(
      createProxyMiddleware('/api', {
        target: 'https://acoe.co.kr/',
        changeOrigin: true,
      }),
    )
};