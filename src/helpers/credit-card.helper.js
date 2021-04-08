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
