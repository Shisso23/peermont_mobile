import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import { PaddedContainer } from '../../containers';
import config from '../../../config';
import { custom } from '../../../../theme/theme.styles';

const OtpAutofillSetting = () => {
  const [hasEnabledOtpAutofill, setHasEnabledOtpAutofills] = useState(true);

  useEffect(() => {
    loadOtpAutofillSetting();
  }, []);

  function toggleSwitch(value) {
    if (value) {
      onEnableOtpAutofill();
    } else {
      onDisableOtpAutofill();
    }
  }

  const loadOtpAutofillSetting = async () => {
    setHasEnabledOtpAutofills(_.isEqual(await AsyncStorage.getItem(config.otpAutofill), 'true'));
  };

  const onEnableOtpAutofill = async () => {
    await AsyncStorage.setItem(config.otpAutofill, 'true');
    setHasEnabledOtpAutofills(true);
  };

  const onDisableOtpAutofill = async () => {
    await AsyncStorage.setItem(config.otpAutofill, 'false');
    setHasEnabledOtpAutofills(false);
  };

  return (
    <PaddedContainer>
      <View style={custom.rowAlign}>
        <Text h4>OTP Autofill</Text>
        <View style={custom.settingsContainer}>
          <Switch onValueChange={toggleSwitch} value={hasEnabledOtpAutofill} />
        </View>
      </View>
    </PaddedContainer>
  );
};

export default OtpAutofillSetting;
