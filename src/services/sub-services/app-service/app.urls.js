import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  androidVersionUrl: () => `${apiUrl}/configs/android_version`,
  iosVersionUrl: () => `${apiUrl}/configs/ios_version`,
};
