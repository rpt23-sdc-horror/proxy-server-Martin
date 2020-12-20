require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const memcached = require('./middleware/memcached/index');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/shop/:productId/:styleId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/inventory/:productID/:styleID', async (req, res) => {
  const { productID, styleID } = req.params;
  const key = '__express__' + req.originalUrl || req.url;
  const result = await memcached.retrieve(key);

  if (result !== null) {
    res.status(200).send(result);
  } else {
    try {
      const response = await fetch(
        `http://localhost:3004/inventory/${productID}/${styleID}`
      );
      await memcached.store(key, response, 1);
      res.status(200).send(response.json());
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
