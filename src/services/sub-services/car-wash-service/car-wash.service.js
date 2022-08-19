import _ from 'lodash';

import carWashUrls from './car-wash.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiVoucherModel } from '../../../models';

export const getAvailableCarWashes = (membershipCard, tierCode) => {
  const apiModel = apiVoucherModel({ membershipCard, tierCode });
  const carWashUrl = carWashUrls.availableCarWashes();
  const returnVouchers = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVouchers);
};

export const getClaimHistory = (membershipCard) => {
  const apiModel = apiVoucherModel({ membershipCard });
  const carWashUrl = carWashUrls.claimHistory();
  const returnVouchers = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVouchers);
};

export default {
  getAvailableCarWashes,
  getClaimHistory,
};
