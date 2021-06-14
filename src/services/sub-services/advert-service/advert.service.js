import _ from 'lodash';

import advertUrls from './advert.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { advertModel } from '../../../models';

const getSplashAdvert = () => {
  const url = advertUrls.splashUrl();

  return authNetworkService
    .get(url)
    .then((apiResponse) => advertModel(_.get(apiResponse, 'data')))
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default {
  getSplashAdvert,
};
