import React from 'react';
import { Button, Input } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { dailyTopUpLimitSchema } from '../form-validaton-schemas';
import { PaddedContainer } from '../../containers';
import { CurrencyIcon } from '../../atoms';
import { getFormError } from '../form-utils';

const DailyTopUpLimitForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    dailyTopUpLimit: dailyTopUpLimitSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('amount', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((resp) => {
        actions.setSubmitting(false);
        onSuccess(resp);
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
        const dailyLimit = _.get(values, 'dailyTopUpLimit', '0');
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <PaddedContainer>
              <Input
                value={_.isNull(dailyLimit) ? dailyLimit : dailyLimit.toString()}
                onChangeText={handleChange('dailyTopUpLimit')}
                label="Limit"
                onBlur={handleBlur('dailyTopUpLimit')}
                errorMessage={error('dailyTopUpLimit')}
                placeholder="0.00"
                keyboardType="decimal-pad"
                leftIcon={CurrencyIcon}
              />
            </PaddedContainer>
            <PaddedContainer>
              <Button title="Update" onPress={handleSubmit} loading={isSubmitting} />
            </PaddedContainer>
          </>
        );
      }}
    </Formik>
  );
};

DailyTopUpLimitForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

DailyTopUpLimitForm.defaultProps = {
  onSuccess: () => null,
};

export default DailyTopUpLimitForm;
