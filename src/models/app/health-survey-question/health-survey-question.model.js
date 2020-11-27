/* eslint-disable camelcase */
export const healthSurveyQuestionModel = ({ question_id, text } = {}) => ({
  id: question_id || '',
  text: text || '',
});

export const constructHealthSurveyQuestionModels = (healthSurveyQuestions) => {
  return (
    (healthSurveyQuestions &&
      healthSurveyQuestions.map((question) => healthSurveyQuestionModel(question))) ||
    []
  );
};
