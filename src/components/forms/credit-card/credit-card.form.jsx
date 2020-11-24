import React from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text } from 'react-native-elements';
import DropdownPicker from 'react-native-dropdown-picker';
import { getFormError } from '../form-utils';
import {
  creditCardNumberSchema,
  creditCardExpiryMonthSchema,
  creditCardHolderSchema,
  creditCardExpiryYearSchema,
  creditCardTypeSchema,
  creditCardCvvSchema,
} from '../form-validaton-schemas';
import {
  expiryMonthsDropdownData,
  expiryYearsDropdownData,
  cardTypesDropdownData,
} from './credit-card-form-data';
import { isMasterCard, isVisa } from './credit-card.utils';
import { custom } from '../../../../theme/theme.styles';

const CreditCardForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    cardHolder: creditCardHolderSchema,
    cardNumber: creditCardNumberSchema,
    expiryMonth: creditCardExpiryMonthSchema,
    expiryYear: creditCardExpiryYearSchema,
    cardType: creditCardTypeSchema,
    cvv: creditCardCvvSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('cardHolder', error.message);
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
        let cardTypeDropdownController;
        const _changeCardTypeToMatchCardNumber = () => {
          if (isMasterCard(values.cardNumber)) {
            setFieldValue('cardType', 'MASTERCARD');
            cardTypeDropdownController.selectItem('MASTERCARD');
          } else if (isVisa(values.cardNumber)) {
            setFieldValue('cardType', 'VISA');
            cardTypeDropdownController.selectItem('VISA');
          }
        };
        return (
          <>
            <Input
              value={values.cardHolder}
              onChangeText={handleChange('cardHolder')}
              label="Card Holder"
              onBlur={handleBlur('cardHolder')}
              errorMessage={error('cardHolder')}
            />
            <Input
              value={values.cardNumber}
              onChangeText={handleChange('cardNumber')}
              label="Card Number"
              onBlur={() => {
                _changeCardTypeToMatchCardNumber();
                handleBlur('cardNumber');
              }}
              errorMessage={error('cardNumber')}
            />
            <DropdownPicker
              items={expiryMonthsDropdownData}
              placeholder="Expiry Month"
              onChangeItem={(dropdownObject) => setFieldValue('expiryMonth', dropdownObject.value)}
              containerStyle={styles.removeMe}
            />
            <Text style={custom.errorStyle}>{error('expiryMonth')}</Text>
            <DropdownPicker
              items={expiryYearsDropdownData()}
              placeholder="Expiry Year"
              onChangeItem={(dropdownObject) => setFieldValue('expiryYear', dropdownObject.value)}
              containerStyle={styles.removeMe}
            />
            <Text style={custom.errorStyle}>{error('expiryYear')}</Text>
            <DropdownPicker
              controller={(instance) => {
                cardTypeDropdownController = instance;
              }}
              items={cardTypesDropdownData}
              value={values.cardType}
              placeholder="Card Type"
              onChangeItem={(dropdownObject) => setFieldValue('cardType', dropdownObject.value)}
              containerStyle={styles.removeMe}
            />
            <Text style={custom.errorStyle}>{error('cardType')}</Text>
            <Input
              value={values.cvv}
              onChangeText={handleChange('cvv')}
              label="CVV"
              onBlur={handleBlur('cvv')}
              errorMessage={error('cvv')}
            />
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

const styles = StyleSheet.create({
  removeMe: {
    height: 55,
  },
});

export default CreditCardForm;
