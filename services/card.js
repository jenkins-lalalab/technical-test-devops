const moment = require('moment');
const uuid = require('uuid/v1');

const cache = require('../cache');
const { Card } = require('../models');

function generateRandomNumber(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

async function create(cardHolderFirstName, cardHolderLastName, currency) {
  const id = uuid();
  const name = `${cardHolderFirstName} ${cardHolderLastName}`;
  const digits = generateRandomNumber(16);
  const cvc = generateRandomNumber(3);
  const expiresAt = moment.utc().add(4, 'years').startOf('month');
  const balance = 0;

  const card = await Card.create({
    id,
    name,
    digits,
    cvc,
    expiresAt,
    balance,
    currency,
  });

  // Save the card in the cache for better performance
  cache.set('last_created_card_id', card.get('id'));

  return card;
}

module.exports = {
  create,
};
