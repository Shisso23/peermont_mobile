/* eslint-disable camelcase */
export const otpModel = ({ otp } = {}) => ({
  numeric: otp || '',
});

export const apiOtpModel = ({ numeric } = {}, token, modelName) => {
  const baseModel = {
    otp: numeric || '',
    token: token || '',
  };
  return modelName
    ? {
        [modelName]: baseModel,
      }
    : baseModel;
};
