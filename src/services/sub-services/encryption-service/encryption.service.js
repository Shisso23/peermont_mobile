import _ from 'lodash';
import networkService from '../network-service/network.service';
import encryptionUrls from './encryption.urls';
import { rsaEncryption, generateRsaKeyPair } from './encryption.utils';

const extractAndReturnCertificate = (apiResponse) => _.get(apiResponse, 'data.certificate');

const encryptPin = (cardNumber, pin) => {
  return getCertificate().then((certificate) => {
    const data = `${cardNumber}|${pin}`;
    return rsaEncryption(data, certificate);
  });
};

const getCertificate = () => {
  const certificateUrl = encryptionUrls.certificateUrl();
  return networkService.get(certificateUrl).then(extractAndReturnCertificate);
};

const getRsaKeyPair = () => {
  return generateRsaKeyPair();
};

export default {
  encryptPin,
  getRsaKeyPair,
};
