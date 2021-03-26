import React, { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Text } from 'react-native-elements';

import { useSelector } from 'react-redux';
import { getFormError } from '../form-utils';
import {
  bankAccountHolderSchema,
  bankAccountAccountNumberSchema,
  bankAccountBankIdSchema,
} from '../form-validaton-schemas';
import { custom } from '../../../../theme/theme.styles';

const BankAccountForm = ({ submitForm, onSuccess, initialValues, edit, initialErrors }) => {
  const accountNumberRef = useRef(null);
  const { banks } = useSelector((reducers) => reducers.formDataReducer);
  const validationSchema = Yup.object().shape({
    accountHolder: bankAccountHolderSchema,
    accountNumber: bankAccountAccountNumberSchema,
    bankId: bankAccountBankIdSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('accountHolder', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((bankAccountId) => {
        actions.setSubmitting(false);
        onSuccess(bankAccountId);
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
      initialErrors={initialErrors}
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
              value={values.accountHolder}
              onChangeText={handleChange('accountHolder')}
              placeholder="Account Holder"
              onBlur={handleBlur('accountHolder')}
              errorMessage={error('accountHolder')}
              onEndEditing={() => accountNumberRef.current.focus()}
            />
            <Input
              ref={accountNumberRef}
              value={values.accountNumber}
              keyboardType="numeric"
              onChangeText={handleChange('accountNumber')}
              placeholder="Account Number"
              onBlur={handleBlur('accountNumber')}
              errorMessage={error('accountNumber')}
            />
            <Picker
              onValueChange={(value) => setFieldValue('bankId', value)}
              selectedValue={values.bankId}
            >
              <Picker.Item label="Select a bank..." value="" />
              {banks.map((bank) => (
                <Picker.Item key={bank.id} label={bank.name} value={bank.id} />
              ))}
            </Picker>
            <Text style={custom.errorStyle}>{error('bankId')}</Text>
            <Button
              title={!edit ? 'Add Account ' : 'Update Account'}
              onPress={handleSubmit}
              loading={isSubmitting}
            />
          </>
        );
      }}
    </Formik>
  );
};

BankAccountForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object,
  onSuccess: PropTypes.func,
  edit: PropTypes.bool,
};

BankAccountForm.defaultProps = {
  onSuccess: () => null,
  initialErrors: {},
  edit: false,
};

export default BankAccountForm;
