import _ from 'lodash';

const silverCard = require('../assets/images/membership-cards/silver-card.png');
const goldCard = require('../assets/images/membership-cards/gold-card.png');
const sapphireCard = require('../assets/images/membership-cards/sapphire-card.png');
const blackCard = require('../assets/images/membership-cards/black-card.png');
const creditCard = require('../assets/images/credit-card.png');

export const getCardType = (type) => {
  switch (_.lowerCase(type)) {
    case 'silver':
      return silverCard;
    case 'gold':
      return goldCard;
    case 'sapphire':
      return sapphireCard;
    case 'black':
      return blackCard;
    case 'credit':
      return creditCard;
    default:
      return null;
  }
}

export default {
  getCardType,
};
