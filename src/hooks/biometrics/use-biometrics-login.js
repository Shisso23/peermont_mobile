import { useDispatch, useSelector } from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import _ from 'lodash';

import { signInWithBiometricsAction } from '../../reducers/user-auth-reducer/user-auth.actions';

export const useBiometricLogin = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.userAuthReducer.isAuthenticated);
  const mobileNumber = useSelector((state) =>
    _.get(state, 'userAuthReducer.signInFormData.mobileNumber'),
  );

  return async () => {
    const { available } = await ReactNativeBiometrics.isSensorAvailable();
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();

    if (available && keysExist && !isSignedIn && !_.isNil(mobileNumber)) {
      return ReactNativeBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: 'Verification',
      })
        .then((resultObject) => {
          const { success, signature } = resultObject;

          if (success) {
            return dispatch(signInWithBiometricsAction(signature)).then(() => {
              return true;
            });
          }

          return success;
        })
        .catch(() => {
          return false;
        });
    }

    return Promise.resolve(false);
  };
};
