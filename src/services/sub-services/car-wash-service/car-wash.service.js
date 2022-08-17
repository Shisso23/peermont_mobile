import _ from 'lodash';

import carWashUrls from './car-wash.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiVoucherModel } from '../../../models';

export const getAvailableCarWashes = (MembershipCard, tierCode) => {
  const apiModel = apiVoucherModel({ MembershipCard, tierCode });
  const carWashUrl = carWashUrls.availableCarWashes();
  const returnVouchers = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVouchers);
};

export default {
  getAvailableCarWashes,
};
