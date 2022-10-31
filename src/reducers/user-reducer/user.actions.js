import _ from 'lodash';

import { setUserAction, setLoadingAction, setOtpAutoFillAction } from './user.reducer';
import { firebaseService, userService, appService } from '../../services';
import { setMembershipCardsAction } from '../membership-card-reducer/membership-card.reducer';
import { setCreditCardsAction } from '../credit-card-reducer/credit-card.reducer';
import { setBankAccountsAction } from '../bank-account-reducer/bank-account.reducer';
import { apiDailyTopUpLimitModel } from '../../models';
import { parseMobile } from '../../models/auth/auth-utils/auth.utils';

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return userService.getUser().then((_user) => {
      dispatch(setUserAction(_user));
      dispatch(setMembershipCardsAction(_user.membershipCards));
      dispatch(setCreditCardsAction(_user.creditCards));
      dispatch(setBankAccountsAction(_user.bankAccounts));
      dispatch(setLoadingAction(false));
    });
  };
};

export const setOtpAutoFillSettingAction = (value) => {
  return (dispatch) => {
    dispatch(setOtpAutoFillAction(value));
  };
};

export const userUpdateProfileAction = (formData) => {
  return (_dispute, getState) => {
    const { mobileNumber } = getState().userReducer.user;
    const unconfirmedMobileNumber = parseMobile(
      _.get(formData, 'mobileNumber'),
      _.get(formData, 'callingCode'),
    );

    formData = {
      mobileNumber: mobileNumber === unconfirmedMobileNumber ? null : unconfirmedMobileNumber,
      email: _.get(formData, 'email'),
    };

    return userService.updateUserProfile(formData);
  };
};

export const updateAppDetails = () => {
  return async () => {
    const firebaseToken = await firebaseService.getAndSetToken();
    const currentAppVersion = await appService.getAppVersion();
    const currentCodePushAppVersion = await appService.getCodePushAppVersion();
    const deviceInfo = await appService.getDeviceInfo();

    return userService.updateUserProfile({
      firebaseToken,
      appVersion: currentAppVersion,
      codePushAppVersion: currentCodePushAppVersion,
      manufacturer: deviceInfo.manufacturer,
      device_os: deviceInfo.device_os,
      os_version: deviceInfo.os_version,
      device_model: deviceInfo.device_model,
    });
  };
};

export const updateAppVersion = () => {
  return async () => {
    const currentAppVersion = await appService.getAppVersion();
    const currentCodePushAppVersion = await appService.getCodePushAppVersion();
    const deviceInfo = await appService.getDeviceInfo();

    return userService.updateUserProfile({
      appVersion: currentAppVersion,
      codePushAppVersion: currentCodePushAppVersion,
      manufacturer: deviceInfo.manufacturer,
      device_os: deviceInfo.device_os,
      os_version: deviceInfo.os_version,
      device_model: deviceInfo.device_model,
    });
  };
};

export const userUploadProfileDocumentsAction = (formData) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));

    return userService
      .uploadUserProfileDocuments(formData)
      .then(() => {
        dispatch(getUserAction());
      })
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const verifyUpdateMobileOtpAction = (formData) => {
  return () => {
    return userService.verifyUpdateMobileOtpAction(formData);
  };
};

export const verifyUpdateEmailOtpAction = (formData) => {
  return () => {
    return userService.verifyUpdateEmail(formData);
  };
};

export const resendUpdateMobileOtpAction = () => {
  return () => {
    return userService.resendUpdateMobileOtpAction();
  };
};

export const sendUserEmailOtpAction = () => {
  return () => {
    return userService.sendEmailOtpAction();
  };
};

export const updateDailyTopUpLimitAction = (formData) => {
  return (dispatch) => {
    const model = apiDailyTopUpLimitModel(formData);

    return userService.updateDailyTopUpLimit(model).then((resp) => {
      return dispatch(getUserAction()).then(() => resp);
    });
  };
};
