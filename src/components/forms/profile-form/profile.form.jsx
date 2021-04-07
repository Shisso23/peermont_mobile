import React, { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, Keyboard, View } from 'react-native';
import { Button, Input, Divider, Text, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { mobileNumberSchema, emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { CountrySelect, AddButton } from '../../atoms';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { LoadingComponent, ProfileDocument } from '../../molecules';
import { useRefreshHeaderButton } from '../../../hooks';
import { infoPopUpService } from '../../../services';
import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';

const ProfileForm = ({ submitForm, onSuccess, initialValues }) => {
  const emailRef = useRef(null);
  const { loading } = useSelector((reducers) => reducers.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    email: emailSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('mobileNumber', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((resp) => {
        Keyboard.dismiss();
        actions.setSubmitting(false);
        onSuccess(_.get(resp, 'data'));
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  if (/[0-9]{11}/.test(initialValues.mobileNumber)) {
    const mobileNumFormated = initialValues.mobileNumber.toString().replace(/[0-9]{2}/, '0');
    initialValues.mobileNumber = mobileNumFormated;
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserAction());
    }, []),
  );

  useRefreshHeaderButton(() => {
    dispatch(getUserAction());
  }, loading);

  const renderUserDocuments = () => {
    const documents = [];
    if (initialValues.proofOfId) {
      documents.push(
        <ProfileDocument
          key="poid"
          name="Proof of ID"
          status={initialValues.proofOfIdStatus}
          disabled
        />,
      );
    }

    if (initialValues.proofOfAddress) {
      documents.push(
        <ProfileDocument
          key="poa"
          name="Proof of Address"
          status={initialValues.proofOfAddressStatus}
          disabled
        />,
      );
    }

    return documents;
  };

  return !loading ? (
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
            <PaddedContainer>
              <Text style={custom.centerTitle}>My Profile</Text>
              <Divider />
              <Input
                style={styles.addPadding}
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                onBlur={handleBlur('email')}
                label="Email"
                errorMessage={error('email')}
                autoCapitalize="none"
                onSubmitEditing={() => emailRef.current.focus()}
                leftIcon={() => <Icon name="email" size={30} color="black" />}
                rightIcon={() => (
                  <Icon
                    name="info"
                    size={20}
                    onPress={() => {
                      infoPopUpService.show(
                        'This is your email linked to your account. To change, enter new email and click update profile.',
                      );
                    }}
                  />
                )}
              />
              <Input
                ref={emailRef}
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                keyboardType="phone-pad"
                label="Mobile Number"
                onBlur={handleBlur('mobileNumber')}
                errorMessage={error('mobileNumber')}
                onSubmitEditing={handleSubmit}
                maxLength={10}
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
                    name="info"
                    size={20}
                    onPress={() => {
                      infoPopUpService.show(
                        'This is your mobile number linked to your account. To change, enter new mobile number and click update profile.',
                      );
                    }}
                  />
                )}
              />
              <View style={styles.rowAlign}>
                <Text h4>Documents</Text>
                <AddButton
                  onPress={() => navigation.navigate('UploadProfileDocument')}
                  containerStyle={styles.addPadding}
                />
              </View>
            </PaddedContainer>

            {_.isEmpty(renderUserDocuments()) ? (
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Document upload</ListItem.Title>
                  <ListItem.Subtitle>
                    Click the plus button above to add your profile documents.
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ) : (
              renderUserDocuments()
            )}

            <PaddedContainer>
              <Button title="Update Profile" onPress={handleSubmit} loading={isSubmitting} />
            </PaddedContainer>
          </>
        );
      }}
    </Formik>
  ) : (
    <LoadingComponent />
  );
};

ProfileForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

ProfileForm.defaultProps = {
  onSuccess: () => null,
};

const styles = StyleSheet.create({
  addPadding: {
    paddingLeft: 10,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileForm;
