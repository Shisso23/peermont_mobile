/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { notificationSettingUpdateAction } from '../../../reducers/notification-reducer/notification.actions';
import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';

const SmsSettings = () => {
  const [hasEnabledSms, sethasEnabledSms] = useState(false);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    loadSmsNotificationSetting();
  }, []);

  function toggleSwitch(value) {
    if (value) {
      onEnableSmsService();
    } else {
      onDisableSmsService();
    }
  }

  const loadSmsNotificationSetting = async () => {
    if (user.optInSms === true) {
      sethasEnabledSms(true);
    } else {
      sethasEnabledSms(false);
    }
  };

  const toggleSms = (opt_in_sms) => {
    const SmsSettingData = {
      opt_in_sms,
    };
    dispatch(notificationSettingUpdateAction(SmsSettingData));
  };

  const onEnableSmsService = async () => {
    sethasEnabledSms(true);
    toggleSms(true);
  };

  const onDisableSmsService = async () => {
    sethasEnabledSms(false);
    toggleSms(false);
  };

  return (
    <PaddedContainer>
      <View style={custom.rowAlign}>
        <Text h4>SMS Notifications</Text>
        <View style={custom.settingsContainer}>
          <Switch onValueChange={toggleSwitch} value={hasEnabledSms} />
        </View>
      </View>
    </PaddedContainer>
  );
};

export default SmsSettings;
