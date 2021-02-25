import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Text } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { NumericInput } from '../../atoms';
import { numericSchema } from '../form-validaton-schemas';

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
          flashService.error('Form Submission Error');
          actions.resetForm({ status: { apiErrors } });
        } else {
          flashService.error(error.message);
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
            {isSubmitting && <Text>loading </Text>}
            <NumericInput
              value={values.numeric}
              onChange={(newNumeric) => setFieldValue('numeric', newNumeric)}
              cellCount={4}
              handleSubmit={handleSubmit}
              errorMessage={error('numeric')}
            />
          </>
        );
      }}
    </Formik>
  );
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
