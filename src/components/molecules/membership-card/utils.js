import _ from 'lodash';

const silverPath = require('../../../assets/images/membership-cards/silver-card.png');
const goldPath = require('../../../assets/images/membership-cards/gold-card.png');
const sapphirePath = require('../../../assets/images/membership-cards/sapphire-card.png');
const blackPath = require('../../../assets/images/membership-cards/black-card.png');

export const getMembershipCardImage = (cardType) => {
  switch (_.lowerCase(cardType)) {
    case 'silver':
      return silverPath;
    case 'gold':
      return goldPath;
    case 'sapphire':
      return sapphirePath;
    case 'black':
      return blackPath;
    default:
      return '';
  }
};
