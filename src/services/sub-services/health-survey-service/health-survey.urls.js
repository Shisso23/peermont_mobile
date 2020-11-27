import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  healthSurveyQuestionsUrl: () => `${apiUrl}/questions`,
  healthSurveyUrl: () => `${apiUrl}/survey_instances`,
};
