import CreateAction from '../action-utilities/action-creator';

const reducerName = 'healthSurvey';

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setHealthSurveyQuestions = CreateAction(reducerName, 'SET_HEALTH_SURVEY_QUESTIONS');
export const setHealthSurveyQuestionsAction = setHealthSurveyQuestions.action;

const setLastHealthSurvey = CreateAction(reducerName, 'SET_LAST_HEALTH_SURVEY');
export const setLastHealthSurveyAction = setLastHealthSurvey.action;

const initialState = {
  isLoading: false,
  healthSurveyQuestions: [],
  lastHealthSurvey: null,
};

export default function healthSurveyReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setHealthSurveyQuestions.actionType:
      return {
        ...state,
        healthSurveyQuestions: action.payload,
        lastHealthSurvey: null,
      };
    case setLastHealthSurvey.actionType:
      return {
        ...state,
        lastHealthSurvey: action.payload,
      };
    default:
      return state;
  }
}
