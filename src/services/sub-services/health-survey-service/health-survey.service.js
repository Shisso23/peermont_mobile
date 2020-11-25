import _ from 'lodash';
import authNetworkService from '../auth-network-service/auth-network.service';
import healthSurveyUrls from './health-survey.urls';
import {
  constructHealthSurveyQuestionModels,
  lastHealthSurveyModel,
  apiConstructHealthSurveyAnswerModels,
} from '../../../models';

const _exstractLastHealthSurvey = (apiResponse) => _.get(apiResponse, 'data', []);
const _constructAndReturnLastHealthSurveyModel = (lastSurvey) => lastHealthSurveyModel(lastSurvey);

const getHealthSurveyQuestions = () => {
  const getHealthSurveyQuestionsUrl = healthSurveyUrls.healthSurveyQuestionsUrl();
  const _exstractQuestionsFromApiResponse = (apiResponse) => _.get(apiResponse, 'data', []);
  return authNetworkService
    .get(getHealthSurveyQuestionsUrl)
    .then(_exstractQuestionsFromApiResponse)
    .then(constructHealthSurveyQuestionModels);
};

const getLastCompletedHealthSurvey = () => {
  const healthSurveyUrl = healthSurveyUrls.healthSurveyUrl();
  return authNetworkService
    .get(healthSurveyUrl)
    .then(_exstractLastHealthSurvey)
    .then(_constructAndReturnLastHealthSurveyModel);
};

const submitHealthSurvey = (formData) => {
  const healthSurveyUrl = healthSurveyUrls.healthSurveyUrl();
  const apiModel = apiConstructHealthSurveyAnswerModels(formData.answers);
  return authNetworkService
    .post(healthSurveyUrl, apiModel)
    .then(_exstractLastHealthSurvey)
    .then(_constructAndReturnLastHealthSurveyModel);
};

export default {
  getHealthSurveyQuestions,
  getLastCompletedHealthSurvey,
  submitHealthSurvey,
};
