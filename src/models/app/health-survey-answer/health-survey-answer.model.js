import _ from 'lodash';

const healthSurveyAnswerModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  answer: '',
});

const apiHealthSurveyAnswerModel = (_model = {}) => {
  return {
    question_id: _.get(_model, 'id'),
    answer: _.get(_model, 'answer'),
  };
};

export const apiConstructHealthSurveyAnswerModels = (healthSurveyAnswers) => {
  const answerArray =
    (healthSurveyAnswers &&
      healthSurveyAnswers.map((answer) => apiHealthSurveyAnswerModel(answer))) ||
    [];
  return {
    survey_instance: {
      survey_responses: answerArray,
    },
  };
};

export const constructHealthSurveyAnswerModels = (healthSurveyQuestions) => {
  return {
    answers:
      (healthSurveyQuestions &&
        healthSurveyQuestions.map((question) => healthSurveyAnswerModel(question))) ||
      [],
  };
};
