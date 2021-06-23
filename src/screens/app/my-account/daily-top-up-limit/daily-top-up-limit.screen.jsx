import React from 'react';
import { Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import DailyTopUpLimitForm from '../../../../components/forms/daily-top-up-limit/daily-top-up-limit.form';
import { userSelector } from '../../../../reducers/user-reducer/user.reducer';
import { updateDailyTopUpLimitAction } from '../../../../reducers/user-reducer/user.actions';
import { flashService } from '../../../../services';
import { custom } from '../../../../../theme/theme.styles';

const DailyTopUpLimitScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const dailyTopUpLimit = _.get(user, 'dailyTopUpLimit', 0);
  const unconfirmedTopUpLimit = _.get(user, 'unconfirmedDailyTopUpLimit');
  const pendingChange = dailyTopUpLimit !== unconfirmedTopUpLimit;

  const _handleFormSubmit = (formData) => dispatch(updateDailyTopUpLimitAction(formData));
  const _handleFormSuccess = (resp) => {
    flashService.success(_.get(resp, 'message', 'Daily Top Up Limit changed'), 10000);
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Daily Top Up Limit</Text>
        <Text style={custom.centerSubtitle}>You can change your daily top up limit.</Text>
        <Text style={custom.centerSubtitle}>Increases only go into effect next trading day</Text>
        <Text style={custom.centerSubtitle}>Decreases are immediate</Text>
        {_.isNull(dailyTopUpLimit) && (
          <>
            <Divider />
            <Text style={custom.centerSubtitle}>No limit set</Text>
          </>
        )}
        {!_.isNull(dailyTopUpLimit) && (
          <>
            <Divider />
            <Text style={custom.centerSubtitle}>Your current limit:</Text>
            <Text style={custom.centerSubtitle}>R {dailyTopUpLimit}</Text>
          </>
        )}
        {!_.isNil(unconfirmedTopUpLimit) && pendingChange && (
          <>
            <Divider />
            <Text style={custom.centerSubtitle}>Pending change:</Text>
            <Text style={custom.centerSubtitle}>R {unconfirmedTopUpLimit}</Text>
          </>
        )}
      </PaddedContainer>
      <PaddedContainer>
        <DailyTopUpLimitForm
          submitForm={_handleFormSubmit}
          onSuccess={_handleFormSuccess}
          initialValues={{ dailyTopUpLimit }}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

DailyTopUpLimitScreen.propTypes = {};

DailyTopUpLimitScreen.defaultProps = {};

export default DailyTopUpLimitScreen;
