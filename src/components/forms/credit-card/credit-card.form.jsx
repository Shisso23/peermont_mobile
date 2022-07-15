import React from 'react';
import _ from 'lodash';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Divider } from 'react-native-elements';
import { CreditCardInput } from 'react-native-credit-card-input';

import { getFormError } from '../form-utils';
import {
  creditCardNumberSchema,
  creditCardHolderSchema,
  creditCardTypeSchema,
  creditCardCvvSchema,
  creditCardExpiryYearSchema,
  creditCardExpiryMonthSchema,
} from '../form-validaton-schemas';
import { custom } from '../../../../theme/theme.styles';
import { backBlueCard, frontBlueCard } from '../../../assets';

const CreditCardForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    cardHolder: creditCardHolderSchema,
    cardNumber: creditCardNumberSchema,
    cardType: creditCardTypeSchema,
    cvv: creditCardCvvSchema,
    expiryYear: creditCardExpiryYearSchema,
    expiryMonth: creditCardExpiryMonthSchema,
  });

  const _handleChange = (data, setFieldValue) => {
    setFieldValue('cardNumber', _.replace(data.values.number, new RegExp('\\s', 'g'), ''));
    if (!_.isEqual(data.values.type, undefined)) {
      setFieldValue('cardType', data.values.type.toUpperCase());
    } else {
      setFieldValue('cardType', 'null');
    }
    setFieldValue('cardHolder', data.values.name);
    setFieldValue('cvv', data.values.cvc);
    setFieldValue('expiryMonth', data.values.expiry.slice(0, 2));
    setFieldValue('expiryYear', data.values.expiry.slice(3));
  };

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else if (_.get(error, 'statusCode') >= 500) {
      const message = _.get(
        error,
        'errors',
        'Could not validate your card, please try again later',
      );
      actions.setFieldError('cardNumber', message);
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
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, isSubmitting, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <CreditCardInput
              onChange={(data) => _handleChange(data, setFieldValue)}
              requiresName
              cardImageFront={frontBlueCard}
              cardImageBack={backBlueCard}
              labelStyle={custom.creditCardLabel}
            />
            <Divider />
            {error ? (
              <Text style={custom.creditCardErrorStyle}>
                {error('cardNumber')}
                {error('cardHolder')}
                {error('cardType')}
                {error('cvv')}
                {error('expiryYear')}
                {error('expiryMonth')}
              </Text>
            ) : null}
            <Button title="Submit" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

CreditCardForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

CreditCardForm.defaultProps = {
  onSuccess: () => null,
};

export default CreditCardForm;
