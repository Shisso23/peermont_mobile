/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import { name as appName } from './app.json';
import App from './src/App';
import theme from './theme/theme';
import store from './src/reducers/store';

const Root = () => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <App />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </ThemeProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
