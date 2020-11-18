import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import {
  emailSchema,
  registerPasswordSchema,
  confirmPasswordSchema,
  termsAndConditionsSchema,
} from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { TermsAndConditions } from '../../atoms';
import { flashService } from '../../../services';

const UserInfoForm = ({ edit, submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    email: emailSchema,
    name: Yup.string().required('Name is required'),
    password: registerPasswordSchema(edit),
    confirmPassword: confirmPasswordSchema(edit),
    termsAndConditions: termsAndConditionsSchema(edit),
  });

  const _handleSubmission = (formData, actions) => {
    submitForm({ formData })
      .then(() => {
        actions.setSubmitting(false);
        flashService.success('Successfully Updated Profile');
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
          setFieldValue,
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
              <Input
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                label="Name"
                errorMessage={error('name')}
              />
              {!edit && (
                <>
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    label="Password"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    errorMessage={error('password')}
                  />
                  <Input
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    label="Confirm Password"
                    secureTextEntry
                    onBlur={handleBlur('confirmPassword')}
                    errorMessage={error('confirmPassword')}
                  />
                </>
              )}
              <Button
                title={!edit ? 'Register' : 'Update'}
                onPress={handleSubmit}
                loading={isSubmitting}
              />
              {!edit && (
                <TermsAndConditions
                  checked={values.termsAndConditions}
                  onPress={() => setFieldValue('termsAndConditions', !values.termsAndConditions)}
                />
              )}
              {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

UserInfoForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  edit: PropTypes.bool,
};

UserInfoForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
  edit: false,
};

export default UserInfoForm;
