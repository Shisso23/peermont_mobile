import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

import { proofOfBankDocumentSchema } from '../form-validaton-schemas';
import { UploadDocumentButton } from '../../molecules';

const UploadDocumentForm = ({ submitForm, onSuccess, initialValues, initialErrors }) => {
  const route = useRoute();
  const validationSchema = Yup.object().shape({
    proofOfBankDocument: proofOfBankDocumentSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('proofOfBankDocument', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    const { bankAccountId } = route.params;
    submitForm(bankAccountId, formData)
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
      {({ handleSubmit, errors, isSubmitting, setFieldValue }) => {
        return (
          <>
            <UploadDocumentButton
              title="Select Document"
              updateFormData={(newDocument) => setFieldValue('proofOfBankDocument', newDocument)}
              errorMessage={errors.proofOfBankDocument}
            />
            <Button title="Upload" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

UploadDocumentForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object,
  onSuccess: PropTypes.func,
};

UploadDocumentForm.defaultProps = {
  onSuccess: () => null,
  initialErrors: {},
};

export default UploadDocumentForm;
