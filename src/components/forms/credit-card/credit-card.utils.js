import _ from 'lodash';

export const isMasterCard = (cardNumber) =>
  _.startsWith(cardNumber, '51') || _.startsWith(cardNumber, '55');

export const isVisa = (cardNumber) => _.startsWith(cardNumber, '4');

export const formatCardExpiryDate = (newText, currentExpiryDate) => {
  if (newText === '') {
    return '';
  }
  if (newText.length < currentExpiryDate.length) {
    return newText;
  }
  if (newText.length === 1 && /[01]/g.test(newText)) {
    return newText;
  }
  if (newText.length === 1 && /[2-9]/g.test(newText)) {
    return `0${newText}/`;
  }
  if (newText.length === 2 && newText[0] === '1' && /[0-2]/g.test(newText[1])) {
    return `1${newText[1]}/`;
  }
  if (newText.length === 2 && newText[0] === '0' && /[1-9]/g.test(newText[1])) {
    return `0${newText[1]}/`;
  }
  if (
    (newText.length === 4 && /[0-9]/g.test(newText[3])) ||
    (newText.length === 5 && /[0-9]/g.test(newText[4]))
  ) {
    return newText;
  }
  if (newText.length === 3 && newText[2] === '/') {
    return newText;
  }
  return newText;
};
