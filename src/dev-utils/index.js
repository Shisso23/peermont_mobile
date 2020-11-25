/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Text } from 'react-native';

export const prettyPrint = (obj) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(obj, null, 2));
  }
};

export const prettyOutputText = (input) =>
  __DEV__ && <Text> {JSON.stringify(input, null, 2)}</Text>;
