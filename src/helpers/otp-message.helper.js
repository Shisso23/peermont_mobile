import _ from 'lodash';

const methodText = (methodType) => {
  switch (methodType) {
    case 'EMAIL':
      return `you `;
    default:
      return 'your mobile number ';
  }
};

export function otpMessage(otpMethod, verificationType, unconfirmedEmail) {
  switch (verificationType) {
    case 'PAYMENT':
      return `We have sent a ${_.lowerCase(otpMethod)} with a One Time Pin (OTP) to ${methodText(
        otpMethod,
      )}
      for validation.`;
    case 'REGISTER':
      return `To proceed, Enter your One Time Pin to register. We have sent a ${_.lowerCase(
        otpMethod,
      )} with a One Time
      Pin(OTP) to your mobile number for validation.`;
    case 'UPDATE_PROFILE':
      return unconfirmedEmail
        ? `To proceed, Enter your One Time Pin to confirm your mobile number change. We have sent a
      ${_.lowerCase(otpMethod)} with a One Time Pin(OTP) to your new mobile number for validation.`
        : `To proceed, Enter your One Time Pin to confirm your email change. We have sent a
        ${_.lowerCase(otpMethod)} with a One Time Pin(OTP) to your for validation.`;
    case 'RESET_PASSWORD':
      return `To proceed, Enter your One Time Pin to reset your password. We have sent a ${_.lowerCase(
        otpMethod,
      )}  with a One
      Time Pin(OTP) to your mobile number for validation.`;
    default:
      return null;
  }
}
