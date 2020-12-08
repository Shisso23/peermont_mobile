import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  openUserGallery,
  openUserCamera,
  openDocumentPicker,
} from './upload-document-button.utils';
import { UploadDocumentSelectionItem } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const actionSheetRef = createRef();

const UploadDocumentButton = ({ updateFormData, errorMessage, title }) => {
  const [documentSelected, setDocumentSelected] = useState(false);

  const openActionSheet = () => actionSheetRef.current.setModalVisible(true);
  const closeActionSheet = () => actionSheetRef.current.setModalVisible(false);

  const _updateFormData = (selectedImage) => {
    updateFormData(selectedImage);
    setDocumentSelected(true);
    closeActionSheet();
  };

  const _handleDocument = () => {
    openDocumentPicker()
      .then(_updateFormData)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  };

  const _handlePhotoLibrary = () => {
    openUserGallery().then(_updateFormData);
  };

  const _handleCamera = () => {
    openUserCamera().then(_updateFormData);
  };

  return (
    <>
      <Button
        title={title}
        onPress={openActionSheet}
        icon={
          <Icon
            name={!documentSelected ? 'upload' : 'check'}
            color="white"
            style={styles.iconStyle}
          />
        }
      />
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
  title: PropTypes.string.isRequired,
};

UploadDocumentButton.defaultProps = {
  errorMessage: '',
};

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 8,
    marginTop: 3,
  },
});

export default UploadDocumentButton;
