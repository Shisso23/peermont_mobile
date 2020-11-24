import _ from 'lodash';

export const isMasterCard = (cardNumber) =>
  _.startsWith(cardNumber, '51') || _.startsWith(cardNumber, '55');

export const isVisa = (cardNumber) => _.startsWith(cardNumber, '4');
