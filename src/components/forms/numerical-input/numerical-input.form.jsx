import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import _ from 'lodash';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import OtpAutocomplete from 'react-native-otp-autocomplete';
import DeviceInfo from 'react-native-device-info';
import { HMSReadSMSManager } from '@hmscore/react-native-hms-account';

import { NumericInput } from '../../atoms';
import { numericSchema } from '../form-validaton-schemas';
import { custom } from '../../../../theme/theme.styles';

const NumericalInputForm = React.forwardRef(
  ({ submitForm, onSuccess, initialValues, otpOption, isLoading, bankAccount }, ref) => {
    const [otp, setOtp] = useState('');
    const [autoFillTry, setAutoFillTry] = useState(otpOption);
    const [formOtpData, setFormOtpData] = useState({});

    const validationSchema = Yup.object().shape({
      numeric: numericSchema,
    });

    const _handleSubmission = (formData, actions) => {
      isLoading(true);
      submitForm(autoFillTry ? formOtpData : formData)
        .then((bankId) => {
          isLoading(false);
          actions.setSubmitting(false);
          OtpAutocomplete.removeListener();
          onSuccess(bankAccount ? bankId : formData);
        })
        .catch((error) => {
          actions.setSubmitting(false);
          const apiErrors = _.get(error, 'errors');
          isLoading(false);
          if (_.get(error, 'statusCode') === 422 || _.get(error, 'statusCode') === 404) {
            actions.setFieldValue('numeric', '', false);
            actions.setFieldError('numeric', _.get(apiErrors, 'numeric'), false);
            turnOffOtpAutoFill();
          } else if (_.get(error, 'statusCode') === 503) {
            actions.setFieldValue('numeric', '', false);
            actions.setFieldError('numeric', 'Service Unavailable', false);
            turnOffOtpAutoFill();
          } else {
            actions.setFieldValue('numeric', '', false);
            actions.setFieldError('numeric', apiErrors, false);
            turnOffOtpAutoFill();
          }
        });
    };

    const turnOffOtpAutoFill = () => {
      setAutoFillTry(false);
    };

    const startListeningForOtpAndroid = () => {
      OtpAutocomplete.getOtp()
        .then(() => OtpAutocomplete.addListener(otpHandler))
        .catch(() => {
          OtpAutocomplete.removeListener();
          turnOffOtpAutoFill();
        });
    };

    const otpHandler = (message) => {
      if (!_.isNull(message) && autoFillTry) {
        try {
          setOtp(/(\d{4})/.exec(message)[1]);
          setFormOtpData({ numeric: /(\d{4})/.exec(message)[1] });
          OtpAutocomplete.removeListener();
        } catch {
          startListeningForOtpAndroid();
        }
      }
    };

    const startListeningForOtpHuawei = () => {
      HMSReadSMSManager.smsVerificationCode()
        .then((message) => {
          if (!_.isNull(message) && autoFillTry) {
            try {
              setOtp(/(\d{4})/.exec(_.get(message, 'Message'))[1]);
              setFormOtpData({ numeric: /(\d{4})/.exec(_.get(message, 'Message'))[1] });
              OtpAutocomplete.removeListener();
            } catch {
              startListeningForOtpAndroid();
            }
          }
        })
        .catch(() => {
          turnOffOtpAutoFill();
        });
    };

    useEffect(() => {
      if (otpOption) {
        DeviceInfo.hasHms().then((hasHms) => {
          if (hasHms) {
            startListeningForOtpHuawei();
          } else if (Platform.OS === 'android') {
            startListeningForOtpAndroid();
          }
        });
      }
    }, []);

    const _renderErrorMessage = (message) => (
      <Text style={[custom.errorStyleCardPin, styles.errorStyle]}>{message}</Text>
    );

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_handleSubmission}
        enableReinitialize
        innerRef={ref}
      >
        {({ handleSubmit, values, isSubmitting, setFieldValue }) => {
          return (
            <>
              <NumericInput
                value={autoFillTry && _.isEmpty(values.numeric) ? otp : values.numeric}
                onChange={(newNumeric) =>
                  setFieldValue('numeric', newNumeric).then(setAutoFillTry(false))
                }
                cellCount={4}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                otpOption={autoFillTry && _.isEmpty(values.numeric)}
                onlyMask={
                  !_.isEmpty(_.get(initialValues, 'numeric')) &&
                  _.get(values, 'numeric') === _.get(initialValues, 'numeric')
                }
              />
              <Divider />
              <View style={styles.messageStyle}>
                <ErrorMessage name="numeric" render={_renderErrorMessage} />
              </View>
            </>
          );
        }}
      </Formik>
    );
  },
);

const styles = StyleSheet.create({
  errorStyle: {
    height: 'auto',
    marginTop: 10,
    textAlign: 'center',
  },
  messageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

NumericalInputForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  otpOption: PropTypes.bool,
  isLoading: PropTypes.func,
  bankAccount: PropTypes.bool,
};

NumericalInputForm.defaultProps = {
  onSuccess: () => null,
  otpOption: false,
  isLoading: () => null,
  bankAccount: false,
};

export default NumericalInputForm;
