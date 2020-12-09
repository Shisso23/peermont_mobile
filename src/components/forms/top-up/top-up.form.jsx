import React, { useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text, ListItem, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFormError } from '../form-utils';
import { paymentAmountSchema, topupCreditCardIdSchema } from '../form-validaton-schemas';

import { custom } from '../../../../theme/theme.styles';
import { getCreditCardsAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { LoadingComponent, CreditCard } from '../../molecules';
import { CurrencyIcon, AddButton } from '../../atoms';

import colors from '../../../../theme/theme.colors';

const TopUpForm = ({ submitForm, onSuccess, initialValues }) => {
  const { creditCards, isLoading } = useSelector((reducers) => reducers.creditCardReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema(Number.MAX_VALUE),
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
              placeholder="0.00"
              keyboardType="decimal-pad"
              leftIcon={CurrencyIcon}
            />
            <View style={styles.rowAlign}>
              <Text h4>Payment Method</Text>
              <AddButton onPress={() => navigation.navigate('AddCreditCard')} />
            </View>
            <Divider />
            {!isLoading ? (
              <>
                {!_.isEmpty(creditCards) &&
                  creditCards.map((creditCard) => {
                    const shouldHighlight = values.creditCardId === creditCard.id && !values.isEft;
                    return (
                      <CreditCard
                        key={creditCard.id}
                        card={creditCard}
                        style={shouldHighlight ? custom.selectedItemStyle : {}}
                        onPress={() => {
                          setFieldValue('creditCardId', creditCard.id);
                          setFieldValue('isEft', false);
                        }}
                      />
                    );
                  })}
                <ListItem
                  bottomDivider
                  disabledStyle={custom.selectedItemStyle}
                  disabled={values.isEft}
                  onPress={() => setFieldValue('isEft', true)}
                >
                  <Icon name="money-bill" size={40} color={colors.primary} />
                  <ListItem.Content>
                    <ListItem.Title>Eft </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </>
            ) : (
              <LoadingComponent />
            )}
            <Text style={custom.errorStyle}> {error('creditCardId')}</Text>

            <Button title="Top Up" onPress={handleSubmit} loading={isSubmitting} />
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
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default TopUpForm;
