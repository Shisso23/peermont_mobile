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

export const claimCarWashVoucher = (membershipCard, tierCode, qrCode, benefitId) => {
  const apiModel = apiVoucherModel({ membershipCard, tierCode, qrCode, benefitId });
  const carWashUrl = carWashUrls.claimCarWashVoucher();
  const returnVouchers = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVouchers);
};

export const getVoucherCount = (membershipCard, tierCode) => {
  const apiModel = apiVoucherModel({ membershipCard, tierCode });
  const carWashUrl = carWashUrls.voucherCount();
  const returnVoucherCount = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVoucherCount);
};

export const canClaimVoucher = (membershipCard, benefitId, otp) => {
  const apiModel = apiVoucherModel({ membershipCard, benefitId, otp });
  const carWashUrl = carWashUrls.canClaimVoucher();
  const returnVoucherCount = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnVoucherCount);
};

export const sendCanClaimOtp = () => {
  const carWashUrl = carWashUrls.sendCanClaimOtp();
  return authNetworkService.get(carWashUrl);
};

export const getCarDetailsForm = (qrCode) => {
  const apiModel = apiVoucherModel({ qrCode });
  const carWashUrl = carWashUrls.getCarDetailsForm();
  const returnCarDetailsForm = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, apiModel).then(returnCarDetailsForm);
};

export const submitCarWashDetails = (carDetails) => {
  const carWashUrl = carWashUrls.submitCarWashDetails();
  const returnCarSuccess = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(carWashUrl, carDetails).then(returnCarSuccess);
};

export default {
  getAvailableCarWashes,
  getClaimHistory,
  claimCarWashVoucher,
  getVoucherCount,
  canClaimVoucher,
  sendCanClaimOtp,
  getCarDetailsForm,
  submitCarWashDetails,
};
