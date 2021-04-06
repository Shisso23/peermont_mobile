/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { notificationSettingUpdateAction } from '../../../reducers/notification-reducer/notification.actions';

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
    <View style={styles.settingsContainer}>
      <>
        <Text>{hasEnabledSms ? 'Enabled' : 'Disabled'}</Text>
        <Switch onValueChange={toggleSwitch} value={hasEnabledSms} />
      </>
    </View>
  );
};

export default SmsSettings;

SmsSettings.propTypes = {};

const styles = StyleSheet.create({
  settingsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
