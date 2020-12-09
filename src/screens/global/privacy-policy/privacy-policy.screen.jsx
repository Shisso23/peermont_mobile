import React from 'react';
import WebView from 'react-native-webview';
import config from '../../../config';
import { LoadingComponent } from '../../../components/molecules';

const PrivacyPolicyScreen = () => {
  return (
    <WebView
      startInLoadingState
      renderLoading={LoadingComponent}
      source={{ uri: `${config.hostUrl}/privacy_policy` }}
    />
  );
};

PrivacyPolicyScreen.propTypes = {};

PrivacyPolicyScreen.defaultProps = {};

export const TermsAndConditionsNavKey = 'TermsAndConditions';
export default PrivacyPolicyScreen;
