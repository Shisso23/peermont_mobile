import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import config from '../../../config';

let startTime = moment();

const AutoSignOut = () => {
  const dispatch = useDispatch();

  const _resetTimer = () => {
    startTime = moment();
  };

  const _shouldSignOut = () => {
    const currentTime = moment();
    const difference = currentTime.diff(startTime, 'seconds');
    return difference > config.autoSignOutTimeout;
  };

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match('active')) {
      if (_shouldSignOut()) {
        if (!__DEV__) {
          dispatch(signOutAction());
        } else {
          // eslint-disable-next-line no-console
          console.warn("Developers don't get signed out :D");
        }
      }
    } else if (nextAppState.match('background')) {
      _resetTimer();
    }
  };
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  return null;
};

AutoSignOut.propTypes = {};

AutoSignOut.defaultProps = {};

export default AutoSignOut;
