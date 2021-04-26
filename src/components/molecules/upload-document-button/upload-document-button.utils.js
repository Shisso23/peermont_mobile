import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import _ from 'lodash';

const successfullySelectedImage = (res) => !res.didCancel;
const errorOccurred = (res) => res.errorCode;

const constructFormData = (res) => ({
  uri: res.uri,
  type: res.type,
  name: _.get(res, 'name', _.get(res, 'fileName')),
});

const imageOptions = {
  mediaType: 'photo',
};

const genericLaunch = (launchFunction) => {
  return new Promise((resolve, reject) => {
    launchFunction(imageOptions, (res) => {
      if (successfullySelectedImage(res)) {
        resolve(constructFormData(res));
      } else if (errorOccurred(res)) {
        reject();
      }
    });
  });
};

export const openUserGallery = () => {
  return genericLaunch(launchImageLibrary);
};

export const openUserCamera = () => {
  return genericLaunch(launchCamera);
};

export const openDocumentPicker = () => {
  return DocumentPicker.pick({
    type: [DocumentPicker.types.pdf],
  }).then(constructFormData);
};
