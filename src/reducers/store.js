import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import reducers from './root.reducer';

export default createStore(reducers, applyMiddleware(ReduxPromise, ReduxThunk));
