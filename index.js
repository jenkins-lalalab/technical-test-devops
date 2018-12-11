const express = require('express');
require('dotenv-safe').config();

const app = express();
const CardService = require('./services/card');

app.post('/card', async (req, res) => {
  const {
    firstName,
    lastName,
    currency,
  } = req.body;
  const card = await CardService.create(firstName, lastName, currency);
  res.send(card);
});

app.listen(process.env.SERVER_PORT);
console.log(`Server listening on port ${process.env.SERVER_PORT}`);
