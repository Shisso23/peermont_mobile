import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Divider } from 'react-native-elements';

import {
  initiateHealthSurveyAction,
  submitHealthSurveyAction,
} from '../../../reducers/health-survey-reducer/health-survey.actions';
import { CompletedHealthSurvey, LoadingComponent } from '../../../components/molecules';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
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

  const displayHealthSurveyForm = _.isEmpty(lastHealthSurvey) || lastHealthSurvey?.hasExpired;

  useEffect(() => {
    dispatch(initiateHealthSurveyAction());
  }, []);

  useDisableBackButtonWhileLoading(isLoading);

  return isLoading ? (
    <LoadingComponent />
  ) : displayHealthSurveyForm ? (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Health Survey</Text>
        <Text style={custom.centerSubtitle}>
          Please answer the following general health questionnaire before visiting us.
        </Text>
      </PaddedContainer>
      <HealthSurveyForm
        submitForm={_handleSubmission}
        initialValues={constructHealthSurveyAnswerModels(healthSurveyQuestions)}
        questions={healthSurveyQuestions}
      />
      <Divider />
    </ScrollContainer>
  ) : (
    <ScrollContainer>
      <CompletedHealthSurvey survey={lastHealthSurvey} />
    </ScrollContainer>
  );
};

HealthSurveyScreen.propTypes = {};

HealthSurveyScreen.defaultProps = {};

export default HealthSurveyScreen;
