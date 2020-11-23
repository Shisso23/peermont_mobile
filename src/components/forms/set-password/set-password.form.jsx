import React from 'react';
import _ from 'lodash';
import { ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { passwordSchema, confirmPasswordSchema } from '../form-validaton-schemas';
import { flashService } from '../../../services';

const SetPasswordForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('password', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success();
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
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              label="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={error('password')}
            />
            <Input
              label="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              errorMessage={error('confirmPassword')}
            />
            <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

SetPasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

SetPasswordForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default SetPasswordForm;
