import React, { useEffect } from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFormError } from '../form-utils';
import { paymentAmountSchema, topupCreditCardIdSchema } from '../form-validaton-schemas';
import { prettyOutputText } from '../../../dev-utils';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import { getCreditCardsAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { LoadingComponent } from '../../molecules';

const TopUpForm = ({ submitForm, onSuccess, initialValues }) => {
  const { creditCards, isLoading } = useSelector((reducers) => reducers.creditCardReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema,
    creditCardId: topupCreditCardIdSchema,
  });

  useEffect(() => {
    dispatch(getCreditCardsAction());
  }, []);

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
        return (
          <>
            <Input
              value={values.amount}
              onChangeText={handleChange('amount')}
              label="Amount"
              onBlur={handleBlur('amount')}
              errorMessage={error('amount')}
              placeholder="R 0.00"
              keyboardType="decimal-pad"
            />

            {!isLoading ? (
              !_.isEmpty(creditCards) && (
                <>
                  {creditCards.map((creditCard) => (
                    <ListItem
                      key={creditCard.id}
                      bottomDivider
                      disabledStyle={styles.selectedCardStyle}
                      disabled={values.creditCardId === creditCard.id && !values.isEft}
                      onPress={() => {
                        setFieldValue('creditCardId', creditCard.id);
                        setFieldValue('isEft', false);
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title>{creditCard.obfuscatedCardNumber}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                  <ListItem
                    bottomDivider
                    disabledStyle={styles.selectedCardStyle}
                    disabled={values.isEft}
                    onPress={() => setFieldValue('isEft', true)}
                  >
                    <ListItem.Content>
                      <ListItem.Title>Eft Payment</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </>
              )
            ) : (
              <LoadingComponent />
            )}

            <Text style={custom.errorStyle}> {error('creditCardId')}</Text>
            <Button title="Add Credit Card" onPress={() => navigation.navigate('AddCreditCard')} />

            <Button title="Add TopUp" onPress={handleSubmit} loading={isSubmitting} />
            {prettyOutputText(values)}
            {prettyOutputText(errors)}
          </>
        );
      }}
    </Formik>
  );
};

TopUpForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

TopUpForm.defaultProps = {
  onSuccess: () => null,
};

const styles = StyleSheet.create({
  selectedCardStyle: {
    backgroundColor: colors.warning,
  },
});

export default TopUpForm;
