const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/main', {
      target: 'http://localhost:8080/api/',
      changeOrigin: true,
    }),
  ),
    app.use(
      createProxyMiddleware('/admin', {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
      }),
    ),
    app.use(
      createProxyMiddleware('/api', {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
      }),
    )
};