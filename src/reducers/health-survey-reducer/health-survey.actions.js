import { healthSurveyService } from '../../services';
import {
  setHealthSurveyQuestionsAction,
  setIsLoadingAction,
  setLastHealthSurveyAction,
} from './health-survey.reducer';

const _noSurveyFound = (err) => {
  if (err.statusCode === 404) {
    return Promise.resolve();
  }
  return Promise.reject(err);
};

export const initiateHealthSurveyAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    const _getLastSurvey = () => healthSurveyService.getLastCompletedHealthSurvey();
    const _storeSurvey = (lastHealthSurvey) =>
      dispatch(setLastHealthSurveyAction(lastHealthSurvey));
    const _getAndStoreQuestions = dispatch(getHealthSurveyQuestionsAction());

    return _getLastSurvey()
      .then(_storeSurvey)
      .catch(_noSurveyFound)
      .then(_getAndStoreQuestions)
      .catch(() => {})
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const submitHealthSurveyAction = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return healthSurveyService
      .submitHealthSurvey(formData)
      .then((newHealthSurvey) => {
        dispatch(setLastHealthSurveyAction(newHealthSurvey));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

const getHealthSurveyQuestionsAction = () => {
  return (dispatch) => {
    return healthSurveyService
      .getHealthSurveyQuestions()
      .then((questions) => {
        dispatch(setHealthSurveyQuestionsAction(questions));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
