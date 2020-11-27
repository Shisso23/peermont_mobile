import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { submitHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { CompletedHealthSurvey } from '../../../components/molecules';
import { FormPageContainer, PageContainer } from '../../../components/containers';
import { HealthSurveyForm } from '../../../components/forms';
import { constructHealthSurveyAnswerModels } from '../../../models';

const HealthSurveyScreen = () => {
  const dispatch = useDispatch();
  const { healthSurveyQuestions, lastHealthSurvey } = useSelector(
    (reducers) => reducers.healthSurveyReducer,
  );

  const _handleSubmission = (formData) => {
    return dispatch(submitHealthSurveyAction(formData));
  };

  const displayHealthSurveyForm = _.isNull(lastHealthSurvey) || lastHealthSurvey?.hasExpired;

  return displayHealthSurveyForm ? (
    <FormPageContainer>
      <HealthSurveyForm
        submitForm={_handleSubmission}
        initialValues={constructHealthSurveyAnswerModels(healthSurveyQuestions)}
        questions={healthSurveyQuestions}
      />
    </FormPageContainer>
  ) : (
    <PageContainer>
      <CompletedHealthSurvey survey={lastHealthSurvey} />
    </PageContainer>
  );
};

HealthSurveyScreen.propTypes = {};

HealthSurveyScreen.defaultProps = {};

export default HealthSurveyScreen;
