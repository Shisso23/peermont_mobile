import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Button, Input, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import _ from 'lodash';

import { CountrySelect } from '../../atoms';
import { mobileNumberSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { infoPopUpService } from '../../../services';

const SignInForm = ({ submitForm, onSuccess, onFailure, initialValues, onMobileNumberClear }) => {
  const [numberDeleted, setNumberDeleted] = useState(false);
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
      if (error.message === 'invalid_grant') {
        actions.setFieldError('mobileNumber', 'Invalid mobile number or password');
      } else {
        actions.setFieldError('mobileNumber', error.message);
      }
    } else {
      actions.setFieldError('mobileNumber', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        Keyboard.dismiss();
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => {
        onFailure();
        _handleFormSubmitError(error, actions, formData);
      });
  };

  const checkNumberChange = (mobileNumber) => {
    if (numberDeleted && _.isEmpty(mobileNumber)) {
      onMobileNumberClear(true);
    } else if (_.toLength(mobileNumber) > 0) {
      setNumberDeleted(true);
    }
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
        handleBlur,
        touched,
        status,
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });

        useEffect(() => {
          checkNumberChange(_.get(values, 'mobileNumber'));
        }, [_.get(values, 'mobileNumber')]);

        return (
          <>
            <Input
              value={values.mobileNumber}
              onChangeText={handleChange('mobileNumber')}
              keyboardType="phone-pad"
              placeholder="Mobile (e.g. 0821234567)"
              onBlur={handleBlur('mobileNumber')}
              onSubmitEditing={() => passwordRef.current.focus()}
              errorMessage={error('mobileNumber')}
              errorStyle={styles.autoHeight}
              leftIcon={() => (
                <CountrySelect
                  initialCountry={values.country}
                  onChange={(country) => {
                    setFieldValue('country', country.abbreviation);
                    setFieldValue('callingCode', country.callingCode);
                  }}
                />
              )}
              rightIcon={() => (
                <Icon
                  name="info-circle"
                  size={15}
                  onPress={() => {
                    infoPopUpService.show(
                      'Enter your mobile number linked to your Winners Circle Account.',
                    );
                  }}
                />
              )}
            />
            <Input
              ref={passwordRef}
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={handleBlur('password')}
              secureTextEntry
              errorMessage={error('password')}
              leftIcon={() => <Icon name="lock" size={15} />}
              onSubmitEditing={handleSubmit}
            />
            <Divider />
            <Button title="Log In" onPress={handleSubmit} />
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  autoHeight: {
    height: 'auto',
  },
});

SignInForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  onMobileNumberClear: PropTypes.func,
};

SignInForm.defaultProps = {
  onSuccess: () => null,
  onFailure: () => null,
  onMobileNumberClear: () => false,
};

export default SignInForm;
