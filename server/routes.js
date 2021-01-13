const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

// Service Endpoints
const invHost = `${process.env.INV_HOST}` || 'localhost';

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/shop/:productId/:styleId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/inventory/:productID/:styleID', (req, res) => {
  const { productID, styleID } = req.params;

  axios
    .get(`http://54.67.9.242/inventory/${productID}/${styleID}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = app;
