import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { name as appName } from './app.json';
import theme from './theme/theme';
import store from './src/reducers/store';
import App from './src/App';

const Root = () => (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );

AppRegistry.registerComponent(appName, () => Root);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage');
