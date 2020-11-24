import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import {
  openUserGallery,
  openUserCamera,
  openDocumentPicker,
} from './upload-document-button.utils';
import { UploadDocumentSelectionItem } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const actionSheetRef = createRef();

const UploadDocumentButton = ({ updateFormData, errorMessage }) => {
  const openActionSheet = () => actionSheetRef.current.setModalVisible(true);
  const closeActionSheet = () => actionSheetRef.current.setModalVisible(false);

  const _updateFormData = (selectedImage) => {
    updateFormData(selectedImage);
    closeActionSheet();
  };

  const _handleDocument = () => {
    openDocumentPicker().then(_updateFormData);
  };

  const _handlePhotoLibrary = () => {
    openUserGallery().then(_updateFormData);
  };

  const _handleCamera = () => {
    openUserCamera().then(_updateFormData);
  };

  return (
    <>
      <Button title="Choose Document" onPress={openActionSheet} />
      <Text style={custom.errorStyle}>{errorMessage}</Text>
      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <View>
          <UploadDocumentSelectionItem title="Take Photo" onPress={_handleCamera} />
          <UploadDocumentSelectionItem
            title="Choose Photo From Library"
            onPress={_handlePhotoLibrary}
          />
          <UploadDocumentSelectionItem title="Select Document" onPress={_handleDocument} />
          <UploadDocumentSelectionItem title="Cancel" onPress={closeActionSheet} />
        </View>
      </ActionSheet>
    </>
  );
};

UploadDocumentButton.propTypes = {
  updateFormData: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

UploadDocumentButton.defaultProps = {
  errorMessage: '',
};

export default UploadDocumentButton;
