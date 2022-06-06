import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Text, ListItem, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { paymentAmountSchema, topupCreditCardIdSchema } from '../form-validaton-schemas';
import { PaddedContainer } from '../../containers';
import { getCreditCardsAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { LoadingComponent, CreditCard } from '../../molecules';
import { CurrencyIcon, AddButton } from '../../atoms';
import { getFormError } from '../form-utils';
import { callPayLogo, ozowLogo, zapperLogo } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';

const TopUpForm = ({ submitForm, onSuccess, initialValues }) => {
  const { creditCards, isLoading } = useSelector((reducers) => reducers.creditCardReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const expiredTokenNotify = () => {
    Alert.alert(
      'Expired Credit Card Token',
      'For security purposes your credit card information needs to be verified. To do so please delete the card from the My Account menu and resubmit.',
      [
        {
          text: 'Top Up',
          onPress: () => {},
        },
        {
          text: 'My Account',
          onPress: () => {
            navigation.navigate('MyAccount');
          },
        },
      ],
    );
  };

  const hasExpiredCard = () => {
    for (let i = 0; i < creditCards.length; i++) {
      if (creditCards[i].status === 'expired') {
        expiredTokenNotify();
        break;
      }
    }
  };

  const validationSchema = Yup.object().shape({
    amount: paymentAmountSchema(Number.MAX_VALUE),
    creditCardId: topupCreditCardIdSchema,
  });

  useEffect(() => {
    dispatch(getCreditCardsAction());
    hasExpiredCard();
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
            <PaddedContainer>
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
            </PaddedContainer>
            {!isLoading ? (
              !_.isEmpty(creditCards) ? (
                <>
                  {creditCards.map((creditCard) => {
                    const isSelected =
                      values.creditCardId === creditCard.id &&
                      !values.isEft &&
                      !values.isOzowEft &&
                      !values.isZapperEft;

                    return (
                      <CreditCard
                        key={creditCard.id}
                        card={creditCard}
                        onPress={() => {
                          setFieldValue('creditCardId', creditCard.id);
                          setFieldValue('isEft', false);
                          setFieldValue('isOzowEft', false);
                          setFieldValue('isZapperEft', false);
                        }}
                        disabled={_.get(creditCard, 'status') !== 'verified'}
                        hasCheckBox={_.get(creditCard, 'status') === 'verified'}
                        isCheckBoxSelected={isSelected}
                        isTopupForm
                      />
                    );
                  })}
                </>
              ) : (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>You don&#39;t have any credit cards setup</ListItem.Title>
                    <ListItem.Subtitle>
                      Click the plus button above to add a credit card.
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            ) : (
              <LoadingComponent />
            )}

            <ListItem
              bottomDivider
              onPress={() => {
                setFieldValue('isOzowEft', false);
                setFieldValue('isZapperEft', false);
                setFieldValue('isEft', true);
                setFieldValue('creditCardId', undefined);
              }}
            >
              <Image source={callPayLogo} style={custom.paymentProviderIcon} />
              <ListItem.Content>
                <ListItem.Title>Instant EFT</ListItem.Title>
              </ListItem.Content>
              <CheckBox checked={values.isEft} disabled />
            </ListItem>

            <ListItem
              bottomDivider
              onPress={() => {
                setFieldValue('isOzowEft', true);
                setFieldValue('isZapperEft', false);
                setFieldValue('isEft', false);
                setFieldValue('creditCardId', undefined);
              }}
            >
              <Image source={ozowLogo} style={custom.paymentProviderIcon} />
              <ListItem.Content>
                <ListItem.Title>Instant EFT</ListItem.Title>
              </ListItem.Content>
              <CheckBox checked={values.isOzowEft} disabled />
            </ListItem>

            <ListItem
              bottomDivider
              onPress={() => {
                setFieldValue('isOzowEft', false);
                setFieldValue('isZapperEft', true);
                setFieldValue('isEft', false);
                setFieldValue('creditCardId', undefined);
              }}
            >
              <Image source={zapperLogo} style={custom.paymentProviderIcon} />
              <ListItem.Content>
                <ListItem.Title>Zapper payment</ListItem.Title>
              </ListItem.Content>
              <CheckBox checked={values.isZapperEft} disabled />
            </ListItem>

            <Text style={[custom.errorStyle, styles.errorStyle]}> {error('creditCardId')}</Text>
            <PaddedContainer>
              <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
            </PaddedContainer>
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
  errorStyle: {
    paddingLeft: 12,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default TopUpForm;
