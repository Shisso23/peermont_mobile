import React from 'react';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from '@rneui/themed';

import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

const ProfileDocument = ({ style, name, status }) => {
  return (
    <ListItem containerStyle={style} bottomDivider disabledStyle={custom.disabledTouchable}>
      <Avatar
        size="medium"
        overlayContainerStyle={{ backgroundColor: colors.gold }}
        icon={{ name: 'check', color: 'white', type: 'font-awesome' }}
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{status}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

ProfileDocument.propTypes = {
  style: ViewPropTypes.style,
  name: PropTypes.string,
  status: PropTypes.string,
};

ProfileDocument.defaultProps = {
  style: {},
  name: '',
  status: '',
};

export default ProfileDocument;
