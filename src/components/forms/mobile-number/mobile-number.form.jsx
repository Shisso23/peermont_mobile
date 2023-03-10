import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFormError } from '../form-utils';
import { infoPopUpService } from '../../../services';
import { CountrySelect } from '../../atoms';
import { mobileNumberSchema } from '../form-validaton-schemas';

const MobileNumberForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
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
              onBlur={handleBlur('mobileNumber')}
              keyboardType="phone-pad"
              placeholder="Mobile (e.g. 0821234567)"
              errorMessage={error('mobileNumber')}
              onSubmitEditing={handleSubmit}
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
                      'Enter your mobile number linked to your Winners Circle account.',
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
  );
};

MobileNumberForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};

MobileNumberForm.defaultProps = {
  onSuccess: () => null,
};

export default MobileNumberForm;
