import React from 'react';
import { Text } from 'react-native-elements';
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
  const initialValues = { dailyTopUpLimit: _.get(user, 'dailyTopUpLimit') };

  const _handleFormSubmit = (formData) => dispatch(updateDailyTopUpLimitAction(formData));
  const _handleFormSuccess = (resp) => {
    flashService.success(_.get(resp, 'message', 'Daily Top Up Limit changed'), 10000);
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Daily Top Up Limit</Text>
        <Text style={custom.centerSubtitle}>
          You can change your daily top up limit. A maximum limit of R1,000,000.00 has been set.
        </Text>
        <Text style={custom.centerSubtitle}>You can only change this amount once a day.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <DailyTopUpLimitForm
          submitForm={_handleFormSubmit}
          onSuccess={_handleFormSuccess}
          initialValues={initialValues}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

DailyTopUpLimitScreen.propTypes = {};

DailyTopUpLimitScreen.defaultProps = {};

export default DailyTopUpLimitScreen;
