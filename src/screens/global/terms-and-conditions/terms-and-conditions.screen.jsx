import React from 'react';
import WebView from 'react-native-webview';
import { LoadingComponent } from '../../../components/molecules';
import config from '../../../config';

const TermsAndConditionsScreen = () => {
  return (
    <WebView
      startInLoadingState
      renderLoading={LoadingComponent}
      source={{ uri: `${config.hostUrl}/terms_and_conditions` }}
    />
  );
};

TermsAndConditionsScreen.propTypes = {};

TermsAndConditionsScreen.defaultProps = {};

export const TermsAndConditionsNavKey = 'TermsAndConditions';
export default TermsAndConditionsScreen;
