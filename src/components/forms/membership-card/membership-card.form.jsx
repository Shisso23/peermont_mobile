import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { cardSchema, pinSchema } from '../form-validaton-schemas';

const MembershipCardForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    cardNumber: cardSchema,
    pin: pinSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('cardNumber', error.message);
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
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <Input
                value={values.cardNumber}
                onChangeText={handleChange('cardNumber')}
                label="Card Number"
                onBlur={handleBlur('cardNumber')}
                errorMessage={error('cardNumber')}
              />
              <Input
                value={values.pin}
                onChangeText={handleChange('pin')}
                label="Pin"
                onBlur={handleBlur('pin')}
                secureTextEntry
                errorMessage={error('pin')}
              />
              <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
              <Text>{JSON.stringify(values)}</Text>
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

MembershipCardForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

MembershipCardForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default MembershipCardForm;
