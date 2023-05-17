const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/main', {
      target: 'http://acoe.co.kr:9090/',
      changeOrigin: true,
    }),
  ),
  app.use(
    createProxyMiddleware('/admin', {
      target: 'http://acoe.co.kr:9090/',
      changeOrigin: true,
    }),
  ),
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://acoe.co.kr:9090/',
      changeOrigin: true,
    }),
  ),
  app.use(
    createProxyMiddleware('/main', {
      target: 'http://localhost:9090/',
      changeOrigin: true,
    }),
  ),
  app.use(
    createProxyMiddleware('/admin', {
      target: 'http://localhost:9090/',
      changeOrigin: true,
    }),
  ),
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:9090/',
      changeOrigin: true,
    }),
  );
};