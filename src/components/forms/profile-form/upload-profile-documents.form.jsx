import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

import { proofOfIdDocumentSchema, proofOfAddressDocumentSchema } from '../form-validaton-schemas';
import { UploadDocumentButton } from '../../molecules';

const UploadProfileDocumentsForm = (props) => {
  const { submitForm, onSuccess, initialValues, initialErrors } = props;
  const validationSchema = Yup.object().shape(
    {
      proofOfIdDocument: proofOfIdDocumentSchema,
      proofOfAddressDocument: proofOfAddressDocumentSchema,
    },
    [['proofOfIdDocument', 'proofOfAddressDocument']],
  );

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('proofOfAddressDocument', error.message);
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
      {({ handleSubmit, errors, isSubmitting, setFieldValue }) => {
        return (
          <>
            <UploadDocumentButton
              title="Proof of ID"
              updateFormData={(newDocument) => setFieldValue('proofOfIdDocument', newDocument)}
              errorMessage={errors.proofOfIdDocument}
            />
            <UploadDocumentButton
              title="Proof of Address"
              updateFormData={(newDocument) => setFieldValue('proofOfAddressDocument', newDocument)}
              errorMessage={errors.proofOfAddressDocument}
            />
            <Button title="Upload" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

UploadProfileDocumentsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object,
  onSuccess: PropTypes.func,
};

UploadProfileDocumentsForm.defaultProps = {
  onSuccess: () => null,
  initialErrors: {},
};

export default UploadProfileDocumentsForm;
