import _ from 'lodash';

export const userUpdateProfileModel = (_profileUpdateModel = {}) => ({
  user: {
    unconfirmed_mobile_number: _.get(_profileUpdateModel, 'mobileNumber', undefined),
    unconfirmed_email: _.get(_profileUpdateModel, 'email', undefined),
    fcm_registration_token: _.get(_profileUpdateModel, 'firebaseToken', undefined),
    pushkit_registration_token: _.get(_profileUpdateModel, 'pushKitToken', undefined),
    app_version: _.get(_profileUpdateModel, 'appVersion', undefined),
    code_push_version: _.get(_profileUpdateModel, 'codePushAppVersion', undefined),
    manufacturer: _.get(_profileUpdateModel, 'manufacturer', undefined),
    device_os: _.get(_profileUpdateModel, 'device_os', undefined),
    os_version: _.get(_profileUpdateModel, 'os_version', undefined),
    device_model: _.get(_profileUpdateModel, 'device_model', undefined),
  },
});

export const userDocumentsModel = (_model = {}) => ({
  proofOfIdDocument: _.get(_model, 'proof_of_id', undefined),
  proofOfAddressDocument: _.get(_model, 'proof_of_address', undefined),
});

export const userUpdateSettingModel = (_model = {}) => ({
  user: {
    opt_in_sms: _.get(_model, 'opt_in_sms', undefined),
    opt_in_push_notifications: _.get(_model, 'opt_in_push_notifications', undefined),
  },
});

export const userUpdateMobileOtpModel = (_model) => ({
  otp: _.get(_model, 'numeric', ''),
});
