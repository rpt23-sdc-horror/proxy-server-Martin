require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const MemoryCache = require('./middleware/memcached/index');

const app = express();
const cache = new MemoryCache();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/shop/:productId/:styleId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/inventory/:productID/:styleID', async (req, res) => {
  const { productID, styleID } = req.params;
  const url = req.originalUrl || req.url;
  const key = `${url}`;
  const result = await cache.retrieve(key);

  if (result) {
    res.status(200).send(result);
  } else {
    await axios
      .get(`http://localhost:8000/inventory/${productID}/${styleID}`)
      .then(async (response) => {
        await cache.store(key, response.data, 5);

        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

module.exports = app;
