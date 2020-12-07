import React, { useEffect } from 'react';
import _ from 'lodash';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text, ListItem, Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFormError } from '../form-utils';
import { prettyOutputText } from '../../../dev-utils';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import { LoadingComponent } from '../../molecules';
import { getBankAccountsAction } from '../../../reducers/bank-account-reducer/bank-account.actions';
import { paymentAmountSchema, payOutBankIdSchema } from '../form-validaton-schemas';

const PayOutForm = ({ submitForm, onSuccess, initialValues }) => {
  const { bankAccounts, isLoading } = useSelector((reducers) => reducers.bankAccountReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema,
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
              placeholder="R 0.00"
              keyboardType="decimal-pad"
            />

            <Text h4>Bank Accounts</Text>
            {!isLoading ? (
              !_.isEmpty(bankAccounts) ? (
                <>
                  {bankAccounts.map((bankAccount) => (
                    <ListItem
                      key={bankAccount.id}
                      containerStyle={
                        values.bankAccountId === bankAccount.id ? styles.selectedCardStyle : {}
                      }
                      disabled={bankAccount.status !== 'verified'}
                      disabledStyle={styles.disabledStyle}
                      bottomDivider
                      onPress={() => setFieldValue('bankAccountId', bankAccount.id)}
                    >
                      <Avatar rounded />
                      <ListItem.Content>
                        <ListItem.Title>{bankAccount.accountNumber}</ListItem.Title>
                        <ListItem.Subtitle>{bankAccount.accountHolder}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Title>{bankAccount.status}</ListItem.Title>
                    </ListItem>
                  ))}
                </>
              ) : (
                <View>
                  <Text>Look at all this empty</Text>
                </View>
              )
            ) : (
              <LoadingComponent />
            )}
            <Text style={custom.errorStyle}> {error('bankAccountId')}</Text>
            <Button
              title="Add Bank Account"
              onPress={() => navigation.navigate('AddBankAccount')}
            />

            <Button title="Add PayOut" onPress={handleSubmit} loading={isSubmitting} />
            {prettyOutputText(values)}
            {prettyOutputText(errors)}
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
  disabledStyle: {
    backgroundColor: colors.danger,
  },
  selectedCardStyle: {
    backgroundColor: colors.warning,
  },
});

export default PayOutForm;
