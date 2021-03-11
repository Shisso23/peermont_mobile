import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ListItem, Text, Divider } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
            <ListItem key={0} containerStyle={custom.listItemContainerStyle}>
              <ListItem.Content style={styles.questionContainer} />
              <View style={styles.answerContainer}>
                <Text style={styles.answerPadding}>Y</Text>
                <Text>/</Text>
                <Text style={styles.answerPadding}>N</Text>
              </View>
            </ListItem>
            {questions.map((question, index) => {
              const answerLocation = `answers[${index}].answer`;
              return (
                <ListItem key={question.id} containerStyle={custom.listItemContainerStyle}>
                  <ListItem.Content style={styles.questionContainer}>
                    <ListItem.Title>{question.text}</ListItem.Title>
                    {!_.isEmpty(error(answerLocation)) && (
                      <Text style={custom.errorStyle}>{error(answerLocation)}</Text>
                    )}
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

const styles = StyleSheet.create({
  answerContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  answerPadding: {
    paddingHorizontal: 10,
  },
  questionContainer: {
    flex: 3,
  },
});

export default HealthSurveyForm;
