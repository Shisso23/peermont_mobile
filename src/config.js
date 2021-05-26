import Config from 'react-native-config';

const {
  HOST_URL,
  API_LOCATION,
  CLIENT_ID,
  CLIENT_SECRET,
  APPCENTER_ANDROID_PRODUCTION,
  APPCENTER_IOS_PRODUCTION,
  APPCENTER_ANDROID_STAGING,
  APPCENTER_IOS_STAGING,
  APPCENTER_ANDROID_DEVELOPMENT,
  APPCENTER_IOS_DEVELOPMENT,
  ENVIRONMENT,
} = Config;

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
  palaceBetLink: 'https://media.palacepartners.com/redirect.aspx?pid=2163&bid=1506',
  appCenterAndroid: APPCENTER_ANDROID_PRODUCTION,
  appCenterAndroidStaging: APPCENTER_ANDROID_STAGING,
  appCenterAndroidDevelopment: APPCENTER_ANDROID_DEVELOPMENT,
  appCenterIos: APPCENTER_IOS_PRODUCTION,
  appCenterIosStaging: APPCENTER_IOS_STAGING,
  appCenterIosDevelopment: APPCENTER_IOS_DEVELOPMENT,
  appEnvironment: ENVIRONMENT,
};
