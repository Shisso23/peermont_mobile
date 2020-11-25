import { healthSurveyService, flashService } from '../../services';
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

    return Promise.resolve()
      .then(_getLastSurvey)
      .then(_storeSurvey)
      .catch(_noSurveyFound)
      .then(_getAndStoreQuestions)
      .catch((err) => flashService.error(err.message))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const submitHealthSurveyAction = (formData) => {
  return (dispatch) => {
    return healthSurveyService.submitHealthSurvey(formData).then((newHealthSurvey) => {
      dispatch(setLastHealthSurveyAction(newHealthSurvey));
    });
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
