import React, { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text } from 'react-native-elements';
import DropdownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { getFormError } from '../form-utils';
import {
  bankAccountHolderSchema,
  bankAccountAccountNumberSchema,
  bankAccountBankIdSchema,
  proofOfBankDocumentSchema,
  editProofOfBankDocumentSchemea,
} from '../form-validaton-schemas';
import { UploadDocumentButton } from '../../molecules';
import { custom } from '../../../../theme/theme.styles';

const BankAccountForm = ({ submitForm, onSuccess, initialValues, edit, initialErrors }) => {
  const accountNumberRef = useRef(null);
  const { banks } = useSelector((reducers) => reducers.formDataReducer);
  const validationSchema = Yup.object().shape({
    accountHolder: bankAccountHolderSchema,
    accountNumber: bankAccountAccountNumberSchema,
    bankId: bankAccountBankIdSchema,
    proofOfBankDocument: !edit ? proofOfBankDocumentSchema : editProofOfBankDocumentSchemea,
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
              label="Account Holder"
              onBlur={handleBlur('accountHolder')}
              errorMessage={error('accountHolder')}
              onEndEditing={() => accountNumberRef.current.focus()}
            />
            <Input
              ref={accountNumberRef}
              value={values.accountNumber}
              onChangeText={handleChange('accountNumber')}
              label="Account Number"
              onBlur={handleBlur('accountNumber')}
              errorMessage={error('accountNumber')}
            />
            <DropdownPicker
              items={banks.map((bank) => ({ value: bank.id, label: bank.name }))}
              placeholder="Bank"
              onChangeItem={(dropdownObject) => setFieldValue('bankId', dropdownObject.value)}
              defaultValue={values.bankId}
            />
            <Text style={custom.errorStyle}>{error('bankId')}</Text>

            <UploadDocumentButton
              title="Select Document"
              updateFormData={(newImage) => setFieldValue('proofOfBankDocument', newImage)}
              errorMessage={errors.proofOfBankDocument}
            />
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
