import React from 'react';
import { ListItem } from '@rneui/themed';
import PropTypes from 'prop-types';

const UploadDocumentSelectionItem = ({ title, onPress }) => {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

UploadDocumentSelectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

UploadDocumentSelectionItem.defaultProps = {};

export default UploadDocumentSelectionItem;
