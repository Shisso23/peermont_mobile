import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input, ListItem, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

import { custom } from '../../../../theme/theme.styles';
import { getFormError } from '../form-utils';
import { PaddedContainer } from '../../containers';
import { BankAccount, LoadingComponent } from '../../molecules';
import { paymentAmountSchema, payOutBankIdSchema } from '../form-validaton-schemas';
import { AddButton, CurrencyIcon } from '../../atoms';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';

const PayOutForm = ({ submitForm, onSuccess, initialValues, amountNotify }) => {
  const navigation = useNavigation();
  const { hasQueuedPayouts } = useSelector((reducers) => reducers.paymentReducer);
  const { bankAccounts, isLoading } = useSelector((reducers) => reducers.bankAccountReducer);
  const { currentMembershipCard } = useSelector(membershipCardSelector);

  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema(currentMembershipCard.balance),
    bankAccountId: payOutBankIdSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
      actions.setFieldError('amount', error.errors);
    } else {
      actions.setFieldError('amount', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  const _navigateBackToMembershipDetail = () => {
    navigation.navigate('MembershipCardDetail');
  };

  const _payoutNotify = (formData, actions) => {
    if (hasQueuedPayouts) {
      Alert.alert(
        'Payouts',
        'You currently have one or more payouts queued, would you like to proceed',
        [
          {
            text: 'Cancel',
            onPress: () => _navigateBackToMembershipDetail(),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => _handleSubmission(formData, actions),
          },
        ],
      );
    } else {
      _handleSubmission(formData, actions);
    }
  };

  const isWeekday = () => {
    const today = new Date();
    if (today.getDay() === 0 && today.getDay() === 6)
      return 'The amount requested exceeds the maximum immediate payout limit of R250 000 on weekends. Please process multiple transactions of R250 000 or contact the cash desk for assistance.';
    if (isPublicHoliday(moment(today).format('MM-DD')))
      return 'The amount requested exceeds the maximum immediate payout limit of R250 000 on public holidays. Please process multiple transactions of R250 000 or contact the cash desk for assistance.';
    return 'The amount requested exceeds the maximum immediate payout limit of R250 000 per transaction on weekdays between 16h00 and 23h59. Please process multiple transactions of R250 000 or contact the cash desk for assistance.';
  };

  const isPublicHoliday = (today) => {
    return (
      '01-01'.includes(today) ||
      '03-21'.includes(today) ||
      '04-15'.includes(today) ||
      '04-18'.includes(today) ||
      '04-27'.includes(today) ||
      '05-02'.includes(today) ||
      '06-16'.includes(today) ||
      '07-09'.includes(today) ||
      '09-24'.includes(today) ||
      '12-16'.includes(today) ||
      '12-25'.includes(today) ||
      '12-26'.includes(today)
    );
  };

  const _amountCheck = (formData, actions) => {
    if (formData.amount > 250000) {
      Alert.alert('Payout Amount', isWeekday(), [
        {
          text: 'Cancel',
          onPress: () => _navigateBackToMembershipDetail(),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => _payoutNotify(formData, actions),
        },
      ]);
    } else {
      _payoutNotify(formData, actions);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_amountCheck}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        handleBlur,
        touched,
        status,
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <PaddedContainer>
              <Input
                value={values.amount}
                onChangeText={handleChange('amount')}
                label="Amount"
                onBlur={handleBlur('amount')}
                errorMessage={error('amount')}
                placeholder="0.00"
                keyboardType="phone-pad"
                leftIcon={CurrencyIcon}
              />
              <View style={styles.rowAlign}>
                <Text h4>Bank Accounts</Text>
                <AddButton onPress={() => navigation.navigate('AddBankAccount')} />
              </View>
            </PaddedContainer>
            {!isLoading ? (
              !_.isEmpty(bankAccounts) ? (
                <>
                  {bankAccounts.map((bankAccount) => {
                    const isSelected = values.bankAccountId === bankAccount.id;

                    return (
                      <BankAccount
                        key={bankAccount.id}
                        account={bankAccount}
                        onPress={() => setFieldValue('bankAccountId', bankAccount.id)}
                        disabled={_.get(bankAccount, 'status') !== 'verified'}
                        hasAccountStatus
                        hasCheckBox
                        isCheckBoxSelected={isSelected}
                      />
                    );
                  })}
                </>
              ) : (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>You don&#39;t have any bank accounts setup</ListItem.Title>
                    <ListItem.Subtitle>
                      Click the plus button above to add a bank account.
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            ) : (
              <LoadingComponent />
            )}
            <Text style={[custom.errorStyle, styles.errorStyle]}> {error('bankAccountId')}</Text>
            <PaddedContainer>
              <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
            </PaddedContainer>
          </>
        );
      }}
    </Formik>
  );
};

PayOutForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  amountNotify: PropTypes.func,
};

PayOutForm.defaultProps = {
  onSuccess: () => null,
  amountNotify: () => null,
};

const styles = StyleSheet.create({
  errorStyle: {
    paddingLeft: 12,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PayOutForm;
