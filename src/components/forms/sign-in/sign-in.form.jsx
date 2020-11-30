import React, { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { mobileNumberSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { CountrySelect } from '../../atoms';

const SignInForm = ({ submitForm, onSuccess, initialValues }) => {
  const passwordRef = useRef(null);
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
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              value={values.mobileNumber}
              onChangeText={handleChange('mobileNumber')}
              keyboardType="phone-pad"
              label="Mobile Number"
              onBlur={handleBlur('mobileNumber')}
              onSubmitEditing={() => passwordRef.current.focus()}
              errorMessage={error('mobileNumber')}
              leftIcon={() => (
                <CountrySelect
                  initialCountry={values.country}
                  onChange={(country) => {
                    setFieldValue('country', country.abbreviation);
                    setFieldValue('callingCode', country.callingCode);
                  }}
                />
              )}
            />
            <Input
              ref={passwordRef}
              value={values.password}
              onChangeText={handleChange('password')}
              label="Password"
              onBlur={handleBlur('password')}
              secureTextEntry
              errorMessage={error('password')}
              leftIcon={() => <Icon name="lock" size={15} />}
              onSubmitEditing={handleSubmit}
            />
            <Divider />
            <Button title="Log In" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

SignInForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

SignInForm.defaultProps = {
  onSuccess: () => null,
};

export default SignInForm;
