import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import { emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

const ForgotPasswordForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    email: emailSchema,
  });

  const _handleSubmission = (formData, actions) => {
    submitForm({ formData })
      .then(() => {
        actions.setSubmitting(false);
        flashService.success(
          'Instructions to reset your password will be sent to your email address',
        );
        onSuccess();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          flashService.error('Form Submission Error');
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={containerStyle}
    >
      <Formik
        initialValues={initialValues}
        initialStatus={{ apiErrors: {} }}
        onSubmit={_handleSubmission}
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
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                errorMessage={error('email')}
              />
              <Button title="Submit" onPress={handleSubmit} loading={isSubmitting} />
              {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

ForgotPasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  initialValues: PropTypes.object.isRequired,
};

ForgotPasswordForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default ForgotPasswordForm;
