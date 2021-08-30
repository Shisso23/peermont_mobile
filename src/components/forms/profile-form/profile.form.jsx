import React, { useRef } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { mobileNumberSchema, emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { CountrySelect } from '../../atoms';
import { infoPopUpService } from '../../../services';

const ProfileForm = ({ submitForm, onSuccess, initialValues }) => {
  const emailRef = useRef(null);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    email: emailSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('mobileNumber', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((resp) => {
        Keyboard.dismiss();
        actions.setSubmitting(false);
        onSuccess(_.get(resp, 'data'));
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  if (/[0-9]{11}/.test(initialValues.mobileNumber)) {
    const mobileNumFormated = initialValues.mobileNumber.toString().replace(/[0-9]{2}/, '0');
    initialValues.mobileNumber = mobileNumFormated;
  }

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
              style={styles.addPadding}
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              onBlur={handleBlur('email')}
              label="Email"
              errorMessage={error('email')}
              autoCapitalize="none"
              onSubmitEditing={() => emailRef.current.focus()}
              leftIcon={() => <Icon name="email" size={30} color="black" />}
              rightIcon={() => (
                <Icon
                  name="info"
                  size={20}
                  onPress={() => {
                    infoPopUpService.show(
                      'This is your email linked to your account. To change, enter new email and click update profile.',
                    );
                  }}
                />
              )}
            />
            <Input
              ref={emailRef}
              disabled
              value={values.mobileNumber}
              onChangeText={handleChange('mobileNumber')}
              keyboardType="phone-pad"
              label="Mobile Number"
              onBlur={handleBlur('mobileNumber')}
              errorMessage={error('mobileNumber')}
              onSubmitEditing={handleSubmit}
              maxLength={10}
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
                  name="info"
                  size={20}
                  onPress={() => {
                    infoPopUpService.show(
                      'This is your mobile number linked to your account. To change, enter new mobile number and click update profile.',
                    );
                  }}
                />
              )}
            />
            <Button title="Update Profile" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

ProfileForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

ProfileForm.defaultProps = {
  onSuccess: () => null,
};

const styles = StyleSheet.create({
  addPadding: {
    paddingLeft: 10,
  },
});

export default ProfileForm;
