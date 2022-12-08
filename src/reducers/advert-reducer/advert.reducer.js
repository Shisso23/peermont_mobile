import CreateAction from '../action-utilities/action-creator';
import { advertModel } from '../../models';

const reducerName = 'advert';

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setSplashAdvert = CreateAction(reducerName, 'set_splash_advert');
export const setSplashAdvertAction = setSplashAdvert.action;

const initialState = {
  isLoading: false,
  splashAdvert: advertModel(),
};

export const advertSelector = (reducer) => reducer.advertReducer;

export const advertReducer = (state = initialState, action) => {
  switch (action.type) {
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setSplashAdvert.actionType:
      return {
        ...state,
        splashAdvert: action.payload,
      };
    default:
      return state;
  }
}

export default{
  advertReducer,
}
