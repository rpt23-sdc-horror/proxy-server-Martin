require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cache = require('./middleware/memcached/index');

const app = express();

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
    try {
      const response = await fetch(
        `http://localhost:3004/inventory/${productID}/${styleID}`
      );

      await cache.store(key, response, 1);
      res.status(200).send(response);
    } catch (err) {
      console.error(`Server Error: ${err}`);
      res.sendStatus(500);
    }
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
