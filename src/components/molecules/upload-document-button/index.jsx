import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actions-sheet';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  openUserGallery,
  openUserCamera,
  openDocumentPicker,
} from './upload-document-button.utils';
import { PressableOpacity, UploadDocumentSelectionItem } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';
import { limitFileName } from '../../../helpers';

const UploadDocumentButton = ({ updateFormData, errorMessage, title }) => {
  const [documentSelected, setDocumentSelected] = useState(false);
  const [documentName, setDocumentName] = useState('No file selected');

  const actionSheetRef = useRef();
  const openActionSheet = () => actionSheetRef.current?.setModalVisible(true);
  const closeActionSheet = () => actionSheetRef.current?.setModalVisible(false);

  const _updateFormData = (selectedFile) => {
    const fileName = _.get(selectedFile, 'name', 'image');
    const format = _.get(selectedFile, 'type');

    updateFormData(selectedFile);
    setDocumentSelected(true);
    setDocumentName(limitFileName(fileName, format));

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
      <View style={styles.buttonContainerStyle}>
        <PressableOpacity onPress={openActionSheet} style={styles.buttonStyle}>
          <Icon
            name={documentSelected ? 'check' : 'upload'}
            color={colors.black}
            style={styles.iconStyle}
          />
          <Text>{title}</Text>
        </PressableOpacity>
        <Text style={styles.fileNameStyle}>{documentName}</Text>
      </View>
      <Text style={[custom.errorStyle, custom.centerSubtitle]}>{errorMessage}</Text>
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
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    color: colors.black,
    flexDirection: 'row',
    padding: 10,
  },
  fileNameStyle: {
    marginLeft: 10,
    width: 150,
  },
  iconStyle: {
    marginRight: 8,
    marginTop: 3,
  },
});

export default UploadDocumentButton;
