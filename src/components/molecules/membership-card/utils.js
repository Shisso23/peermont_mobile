import _ from 'lodash';

import { silverPath, goldPath, sapphirePath, blackPath } from '../../../assets';

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
