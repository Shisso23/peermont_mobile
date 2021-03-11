import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

import { submitHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { CompletedHealthSurvey } from '../../../components/molecules';
import { FormPageContainer, PageContainer } from '../../../components/containers';
import { HealthSurveyForm } from '../../../components/forms';
import { constructHealthSurveyAnswerModels } from '../../../models';
import { useDisableBackButtonWhileLoading } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';

const HealthSurveyScreen = () => {
  const dispatch = useDispatch();
  const { healthSurveyQuestions, lastHealthSurvey, isLoading } = useSelector(
    (reducers) => reducers.healthSurveyReducer,
  );

  const _handleSubmission = (formData) => {
    return dispatch(submitHealthSurveyAction(formData));
  };

  const displayHealthSurveyForm = _.isNull(lastHealthSurvey) || lastHealthSurvey?.hasExpired;

  useDisableBackButtonWhileLoading(isLoading);

  return displayHealthSurveyForm ? (
    <FormPageContainer>
      <Text style={custom.centerSubtitle}>
        Please answer the following general health questionnaire up to{' '}
        <Text style={custom.bold}>8 hours</Text> before you plan on visiting us.
      </Text>
      <HealthSurveyForm
        submitForm={_handleSubmission}
        initialValues={constructHealthSurveyAnswerModels(healthSurveyQuestions)}
        questions={healthSurveyQuestions}
      />
    </FormPageContainer>
  ) : (
    <PageContainer>
      <Text style={custom.centerTitle}>Health Survey</Text>
      <CompletedHealthSurvey survey={lastHealthSurvey} />
    </PageContainer>
  );
};

HealthSurveyScreen.propTypes = {};

HealthSurveyScreen.defaultProps = {};

export default HealthSurveyScreen;
