import React from 'react';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { qrCodeSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { custom } from '../../../../theme/theme.styles';
import { PaddedContainer } from '../../containers';

const QrInputForm = ({ submitForm, initialValues }) => {
  const validationSchema = Yup.object().shape({
    qrCode: qrCodeSchema,
  });

  const _handleSubmission = (formData) => {
    submitForm(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched, status }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              value={values.qrCode}
              onChangeText={handleChange('qrCode')}
              placeholder="QR Code"
              errorMessage={error('qrCode')}
            />
            <PaddedContainer>
              <Button
                containerStyle={custom.qrSubmitButtonContainer}
                buttonStyle={custom.qrSubmitButton}
                titleStyle={custom.qrSubmitTitle}
                title="Submit"
                onPress={handleSubmit}
              />
            </PaddedContainer>
          </>
        );
      }}
    </Formik>
  );
};

QrInputForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

QrInputForm.defaultProps = {};

export default QrInputForm;
