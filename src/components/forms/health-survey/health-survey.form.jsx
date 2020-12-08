import React, { useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, ListItem, Text, Divider } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { surveyAnswersSchema } from '../form-validaton-schemas';
import { YesNo } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const HealthSurveyForm = ({ submitForm, initialValues, questions }) => {
  const yesNoComponentRefs = useRef(Array(questions.length));

  const validationSchema = Yup.object().shape({
    answers: surveyAnswersSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else {
      actions.setFieldError('global', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData).catch((error) => _handleFormSubmitError(error, actions, formData));
  };
  const _setAllCheckboxesToNo = () => {
    yesNoComponentRefs.current.forEach((yesNoRef) => {
      yesNoRef.changeToNo();
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit, errors, isSubmitting, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            {questions.map((question, index) => {
              const answerLocation = `answers[${index}].answer`;
              return (
                <ListItem key={question.id}>
                  <ListItem.Content>
                    <ListItem.Title>{question.text}</ListItem.Title>
                    <Text style={custom.errorStyle}>{error(answerLocation)}</Text>
                  </ListItem.Content>
                  <YesNo
                    ref={(ref) => {
                      yesNoComponentRefs.current[index] = ref;
                    }}
                    setFormValue={(newValue) => setFieldValue(answerLocation, newValue)}
                  />
                </ListItem>
              );
            })}
            <Divider />
            <Button title="Set all to no" onPress={_setAllCheckboxesToNo} />
            <Divider />
            <Button title="Next" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

HealthSurveyForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

HealthSurveyForm.defaultProps = {};

export default HealthSurveyForm;
