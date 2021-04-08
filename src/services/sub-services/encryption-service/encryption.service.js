import _ from 'lodash';
import networkService from '../network-service/network.service';
import encryptionUrls from './encryption.urls';
import { rsaEncryption } from './encryption.utils';

const extractAndReturnCertificate = (apiResponse) => _.get(apiResponse, 'data.certificate');

const encryptPin = (pin) => {
  return getCertificate().then((certificate) => rsaEncryption(pin, certificate));
};

const getCertificate = () => {
  const certificateUrl = encryptionUrls.certificateUrl();
  return networkService.get(certificateUrl).then(extractAndReturnCertificate);
};

export default {
  encryptPin,
};
