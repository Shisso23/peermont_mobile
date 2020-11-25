/* eslint-disable camelcase */
const healthSurveyAnswerModel = ({ id } = {}) => ({
  id: id || '',
  answer: '',
});

const apiHealthSurveyAnswerModel = ({ id, answer } = {}) => {
  return {
    question_id: id || '',
    answer,
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
