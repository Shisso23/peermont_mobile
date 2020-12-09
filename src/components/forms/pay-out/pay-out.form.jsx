import React, { useEffect } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFormError } from '../form-utils';

import { custom } from '../../../../theme/theme.styles';
import { LoadingComponent, BankAccount } from '../../molecules';
import { getBankAccountsAction } from '../../../reducers/bank-account-reducer/bank-account.actions';
import { paymentAmountSchema, payOutBankIdSchema } from '../form-validaton-schemas';
import { CurrencyIcon, AddButton } from '../../atoms';

const PayOutForm = ({ submitForm, onSuccess, initialValues }) => {
  const { bankAccounts, isLoading } = useSelector((reducers) => reducers.bankAccountReducer);
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema(currentMembershipCard.balance),
    bankAccountId: payOutBankIdSchema,
  });

  useEffect(() => {
    dispatch(getBankAccountsAction());
  }, []);

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('amount', error.message);
    }
    actions.setFieldError('amount', error.errors);
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
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

            <Divider />
            {!isLoading ? (
              !_.isEmpty(bankAccounts) ? (
                <>
                  {bankAccounts.map((bankAccount) => {
                    const shouldHighlight = values.bankAccountId === bankAccount.id;
                    return (
                      <BankAccount
                        key={bankAccount.id}
                        style={shouldHighlight ? custom.selectedItemStyle : {}}
                        account={bankAccount}
                        onPress={() => setFieldValue('bankAccountId', bankAccount.id)}
                        hasAccountStatus
                        hasDisabled
                      />
                    );
                  })}
                </>
              ) : (
                <View>
                  <Text>No bank account found</Text>
                </View>
              )
            ) : (
              <LoadingComponent />
            )}
            <Text style={custom.errorStyle}> {error('bankAccountId')}</Text>
            <Divider />

            <Button title="Pay Out" onPress={handleSubmit} loading={isSubmitting} />
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
};

PayOutForm.defaultProps = {
  onSuccess: () => null,
};

const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PayOutForm;
