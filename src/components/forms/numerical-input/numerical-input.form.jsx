import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import _ from 'lodash';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { NumericInput } from '../../atoms';
import { numericSchema } from '../form-validaton-schemas';
import { custom } from '../../../../theme/theme.styles';

const NumericalInputForm = React.forwardRef(({ submitForm, onSuccess, initialValues }, ref) => {
  const validationSchema = Yup.object().shape({
    numeric: numericSchema,
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess(formData);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        const apiErrors = _.get(error, 'errors');

        if (_.get(error, 'statusCode') === 422) {
          actions.setFieldValue('numeric', '', false);
          actions.setFieldError('numeric', _.get(apiErrors, 'numeric'), false);
        } else {
          actions.setFieldValue('numeric', '', false);
          actions.setFieldError('numeric', apiErrors, false);
        }
      });
  };

  const _renderErrorMessage = (message) => (
    <Text style={[custom.errorStyle, styles.errorStyle]}>{message}</Text>
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
              value={values.numeric}
              onChange={(newNumeric) => setFieldValue('numeric', newNumeric)}
              cellCount={4}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
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
});

const styles = StyleSheet.create({
  errorStyle: {
    marginTop: 10,
    textAlign: 'center',
  },
  messageStyle: {
    height: 20,
  },
});

NumericalInputForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};

NumericalInputForm.defaultProps = {
  onSuccess: () => null,
};

export default NumericalInputForm;
