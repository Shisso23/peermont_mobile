import React from 'react';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { UploadProfileDocumentsForm } from '../../../../components/forms';
import { userDocumentsModel } from '../../../../models';
import { userUploadProfileDocumentsAction } from '../../../../reducers/user-reducer/user.actions';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';
import { custom } from '../../../../../theme/theme.styles';

const UploadProfileDocumentsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleFormSubmit = (formData) => {
    return dispatch(userUploadProfileDocumentsAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  const { isLoading } = useSelector((reducers) => reducers.userReducer);
  useDisableBackButtonWhileLoading(isLoading, 2);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Documents Upload</Text>
        <Text style={custom.centerSubtitle}>
          Proof of Identification can be either your ID, Drivers License or Passport
        </Text>
        <Text style={custom.centerSubtitle}>Upload a PDF where possible.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <UploadProfileDocumentsForm
          submitForm={_handleFormSubmit}
          initialValues={userDocumentsModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

UploadProfileDocumentsScreen.propTypes = {};

UploadProfileDocumentsScreen.defaultProps = {};

export default UploadProfileDocumentsScreen;
