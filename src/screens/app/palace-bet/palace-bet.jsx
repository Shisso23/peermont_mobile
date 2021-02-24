import React from 'react';
import WebView from 'react-native-webview';
import { LoadingComponent } from '../../../components/molecules';

const PalaceBetScreen = () => {
  return (
    <WebView
      startInLoadingState
      renderLoading={LoadingComponent}
      source={{ uri: `https://media.palacepartners.com/redirect.aspx?pid=2163&bid=1506` }}
    />
  );
};

PalaceBetScreen.propTypes = {};

PalaceBetScreen.defaultProps = {};

export const PalaceBetScreenNavKey = 'TermsAndConditions';
export default PalaceBetScreen;
