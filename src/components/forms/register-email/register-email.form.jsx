import React from 'react';
import { Button, Input, Divider, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { infoPopUpService } from '../../../services';
import { getFormError } from '../form-utils';
import { registerEmailSchema } from '../form-validaton-schemas';

const RegisterEmailForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    unconfirmed_email: registerEmailSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('pin', error.message);
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
    <>
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
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <Input
                value={values.unconfirmed_email}
                onChangeText={handleChange('unconfirmed_email')}
                keyboardType="email-address"
                placeholder="Email"
                onBlur={handleBlur('unconfirmed_email')}
                errorMessage={error('unconfirmed_email')}
                onSubmitEditing={handleSubmit}
                autoCapitalize="none"
                leftIcon={() => <Icon name="email" type="material" size={22} color="black" />}
                rightIcon={() => (
                  <Icon
                    name="info-circle"
                    type="font-awesome-5"
                    size={15}
                    onPress={() => {
                      infoPopUpService.show(
                        'This is your email linked to your account. To change, enter new email and click update profile.',
                      );
                    }}
                  />
                )}
              />
              <Divider />
              <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
            </>
          );
        }}
      </Formik>
    </>
  );
};

RegisterEmailForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

RegisterEmailForm.defaultProps = {
  onSuccess: () => null,
};

export default RegisterEmailForm;
