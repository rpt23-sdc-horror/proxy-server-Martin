require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(
  '/shop/:productId/:styleId',
  createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true })
);

const port = 4000;

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
