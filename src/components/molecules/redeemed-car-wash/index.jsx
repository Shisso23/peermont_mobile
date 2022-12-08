import React from 'react';
import { ListItem } from '@rneui/themed';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { custom } from '../../../../theme/theme.styles';
import { claimedCarWashModel } from '../../../models';

const RedeemedClaim = ({ claimHistoryData }) => {
  const claimHistory = claimedCarWashModel(claimHistoryData);

  return (
    <ListItem key={_.get(claimHistoryData, 'id')} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{claimHistory.displayName}</ListItem.Title>
        <ListItem.Subtitle>{claimHistory.benefitDescription}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={custom.alignRight}>
        <ListItem.Title>{claimHistory.claimedDate}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

RedeemedClaim.propTypes = {
  claimHistoryData: PropTypes.object,
};

RedeemedClaim.defaultProps = {
  claimHistoryData: {},
};

export default RedeemedClaim;
