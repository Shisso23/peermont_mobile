import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { getFormError } from '../form-utils';
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
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          actions.resetForm({ status: { apiErrors } });
        } else {
          actions.setFieldError('numeric', error.message);
          actions.resetForm();
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
      enableReinitialize
      innerRef={ref}
    >
      {({ handleSubmit, values, errors, isSubmitting, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <NumericInput
              value={values.numeric}
              onChange={(newNumeric) => setFieldValue('numeric', newNumeric)}
              cellCount={4}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            <View style={styles.messageStyle}>
              {isSubmitting && <Text style={styles.submittingStyle}>Submitting...</Text>}
              {error('numeric') && (
                <Text style={[custom.errorStyle, styles.errorStyle]}>{error('numeric')}</Text>
              )}
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
  submittingStyle: {
    marginTop: 10,
    textAlign: 'center',
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
