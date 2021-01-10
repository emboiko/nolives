const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ["/auth", "/user"],
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
      secure: false
    })
  );
};
