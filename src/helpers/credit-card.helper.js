import _ from 'lodash';

import { decode64 } from '../services/sub-services/encryption-service/encryption.utils';

export const obfuscateCardNumber = (cardNumber) => {
  const stringArray = _.split(cardNumber, '');
  const obfuscatedArray = _.fill(stringArray, '*', '6', cardNumber.length - 5);
  const obfuscatedString = _.join(obfuscatedArray, '');
  return obfuscatedString;
};

export const decryptCallpayCredentials = (credentials, privateKey) => {
  const { encodedUsername, encodedPassword } = credentials;

  const decodedUsername = decode64(encodedUsername);
  const decodedPassword = decode64(encodedPassword);

  return {
    username: privateKey.decrypt(decodedUsername),
    password: privateKey.decrypt(decodedPassword),
  };
};

export const luhnChecksum = (cardNumber) => {
  const cardString = cardNumber.toString();
  const { length } = cardString;
  const parity = length % 2;
  let sum = 0;

  for (let i = 0; i <= length - 1; i++) {
    let digit = parseInt(cardString[i], 10);
    if (i % 2 === parity) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};
