/* eslint-disable import/no-unresolved */
import { API_LOCATION, CLIENT_ID, CLIENT_SECRET, HOST_URL, CALLPAY_URL } from '@env';

export default {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  hostUrl: HOST_URL,
  apiUrl: `${HOST_URL}${API_LOCATION}`,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callCentreNumber: '0119281000',
  customerCareEmail: 'customercare@peermont.com',
  autoSignOutTimeout: 120,
  fcmTokenKey: 'fcmToken',
  fcmEnabled: 'fcmEnabled',
  biometricOtpOut: 'biometric_opt_out',
  callpayUrl: CALLPAY_URL,
};
