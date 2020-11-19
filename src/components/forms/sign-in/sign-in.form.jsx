import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import { mobileNumberSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { CountrySelect } from '../../atoms';

const SignInForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    password: passwordSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else if (error.statusCode === 400) {
      actions.setFieldError('mobileNumber', 'Incorrect login credetials provided');
    } else {
      actions.setFieldError('mobileNumber', error.message);
    }
  };
  const _handleSubmission = (formData, actions) => {
    submitForm({ formData })
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
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
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                label="Mobile Number"
                onBlur={handleBlur('mobileNumber')}
                errorMessage={error('mobileNumber')}
                leftIcon={() => (
                  <CountrySelect onChange={(c) => setFieldValue('callingCode', c.callingCode[0])} />
                )}
              />
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                label="Password"
                onBlur={handleBlur('password')}
                secureTextEntry
                errorMessage={error('password')}
              />
              <Button title="Login" onPress={handleSubmit} loading={isSubmitting} />
              {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

SignInForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

SignInForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default SignInForm;
