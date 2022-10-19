import React, { useRef, useState } from 'react';
import { Button, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { getFormError } from '../form-utils';
import { membershipCardSchema, pinSchema } from '../form-validaton-schemas';
import { infoPopUpService } from '../../../services';
import { RegisterCardModal } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const MembershipCardForm = ({ submitForm, onSuccess, initialValues }) => {
  const pinRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    cardNumber: membershipCardSchema,
    pin: pinSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('pin', error.message);
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

  const _handleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
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
                keyboardType="numeric"
                placeholder="Card Number"
                onBlur={handleBlur('cardNumber')}
                errorMessage={error('cardNumber')}
                onSubmitEditing={() => pinRef.current.focus()}
                maxLength={18}
                leftIcon={() => <Icon name="credit-card" size={15} />}
                rightIcon={() => (
                  <Icon name="info-circle" size={15} onPress={_handleModalVisibility} />
                )}
              />
              <Input
                ref={pinRef}
                value={values.pin}
                onChangeText={handleChange('pin')}
                keyboardType="numeric"
                placeholder="Card PIN"
                onBlur={handleBlur('pin')}
                secureTextEntry
                errorMessage={error('pin')}
                errorStyle={[custom.errorStyle, custom.extendedErrorStyle]}
                onSubmitEditing={handleSubmit}
                leftIcon={() => <Icon name="lock" size={15} />}
                rightIcon={() => (
                  <Icon
                    name="info-circle"
                    size={15}
                    onPress={() => {
                      infoPopUpService.show(
                        'Enter your Peermont Winners Circle PIN for the above card number.',
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
      <RegisterCardModal visible={modalVisible} setModalVisible={_handleModalVisibility} />
    </>
  );
};

MembershipCardForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

MembershipCardForm.defaultProps = {
  onSuccess: () => null,
};

export default MembershipCardForm;
