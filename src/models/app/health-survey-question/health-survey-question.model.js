import _ from 'lodash';

export const healthSurveyQuestionModel = (_model = {}) => ({
  id: _.get(_model, 'question_id'),
  text: _.get(_model, 'text'),
});

export const constructHealthSurveyQuestionModels = (healthSurveyQuestions) => {
  return (
    (healthSurveyQuestions &&
      healthSurveyQuestions.map((question) => healthSurveyQuestionModel(question))) ||
    []
  );
};
