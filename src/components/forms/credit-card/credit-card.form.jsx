import React, { useRef } from 'react';
import _ from 'lodash';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'react-native-elements';
import { getFormError } from '../form-utils';
import {
  creditCardNumberSchema,
  creditCardHolderSchema,
  creditCardTypeSchema,
  creditCardCvvSchema,
  creditCardExpiryDateSchema,
} from '../form-validaton-schemas';
import { infoPopUpService } from '../../../services';
import { isMasterCard, isVisa, formatCardExpiryDate } from './credit-card.utils';

const CreditCardForm = ({ submitForm, onSuccess, initialValues }) => {
  const cardHolderRef = useRef(null);
  const expiryDatRef = useRef(null);
  const cvvRef = useRef(null);

  const validationSchema = Yup.object().shape({
    cardHolder: creditCardHolderSchema,
    cardNumber: creditCardNumberSchema,
    cardType: creditCardTypeSchema,
    cvv: creditCardCvvSchema,
    expiryDate: creditCardExpiryDateSchema,
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
        const _changeCardTypeToMatchCardNumber = () => {
          if (isMasterCard(values.cardNumber)) {
            setFieldValue('cardType', 'MASTERCARD');
          } else if (isVisa(values.cardNumber)) {
            setFieldValue('cardType', 'VISA');
          }
        };
        return (
          <>
            <Input
              value={values.cardNumber}
              onChangeText={handleChange('cardNumber')}
              keyboardType="numeric"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              onBlur={(e) => {
                _changeCardTypeToMatchCardNumber();
                handleBlur('cardNumber')(e);
              }}
              errorMessage={error('cardNumber')}
              onSubmitEditing={() => cardHolderRef.current.focus()}
            />
            <Input
              ref={cardHolderRef}
              value={values.cardHolder}
              onChangeText={handleChange('cardHolder')}
              placeholder="Name on Card"
              label="Card Holder"
              onBlur={handleBlur('cardHolder')}
              errorMessage={error('cardHolder')}
              onSubmitEditing={() => expiryDatRef.current.focus()}
            />
            <View style={styles.rowAlign}>
              <Input
                ref={expiryDatRef}
                containerStyle={styles.flexMargin}
                value={values.expiryDate}
                onChangeText={(value) => {
                  const formatted = formatCardExpiryDate(value, values.expiryDate);
                  setFieldValue('expiryMonth', formatted.substr(0, 2));
                  setFieldValue('expiryYear', formatted.substr(3, 2));
                  handleChange('expiryDate')(formatted);
                }}
                keyboardType="phone-pad"
                label="Expiry Date"
                placeholder="MM/YY"
                onBlur={handleBlur('expiryDate')}
                errorMessage={error('expiryDate')}
                onSubmitEditing={() => cvvRef.current.focus()}
              />
              <Input
                ref={cvvRef}
                value={values.cvv}
                containerStyle={styles.flex}
                onChangeText={handleChange('cvv')}
                keyboardType="phone-pad"
                placeholder="000"
                label="CVV"
                onBlur={handleBlur('cvv')}
                errorMessage={error('cvv')}
                onSubmitEditing={handleSubmit}
                rightIcon={() => (
                  <Icon
                    name="info-circle"
                    size={15}
                    onPress={() => {
                      infoPopUpService.show(
                        "Your CVV number is never saved, it's only used for verification.",
                      );
                    }}
                  />
                )}
              />
            </View>
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
  flex: {
    flex: 1,
  },
  flexMargin: {
    flex: 1,
    marginRight: 10,
  },
  rowAlign: {
    flexDirection: 'row',
  },
});

export default CreditCardForm;
