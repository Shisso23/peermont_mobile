import React from 'react';
import { View } from 'react-native';
import { Divider, Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import { PaddedContainer } from '../../containers';

const CompletedHealthSurvey = ({ survey }) => {
  const allowed = _.get(survey, 'allowed');
  const hasExpired = _.get(survey, 'hasExpired');
  const completedAt = moment(_.get(survey, 'created_at')).format('YYYY-MM-DD HH:mm:ss');
  const expiresAt = moment(_.get(survey, 'created_at')).add('8', 'h').format('YYYY-MM-DD HH:mm:ss');

  const successText = 'Thank you. Please show this survey result to the guards upon entry.';
  const failedText =
    'Thank you, unfortunately we have identified a possible risk in your assessment and cannot allow access.';

  const success = allowed && !hasExpired;

  return (
    <View>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Health Survey</Text>
        <Text style={custom.centerSubtitle}>{success ? successText : failedText}</Text>
      </PaddedContainer>
      <PaddedContainer>
        {success ? (
          <Icon type="font-awesome-5" name="check" color={colors.success} size={160} />
        ) : (
          <Icon type="font-awesome-5" name="times" color={colors.danger} size={160} />
        )}

        <Divider />
        <Text style={custom.centerSubtitle}>
          {success && 'Survey result is only valid for 8 hours'}
        </Text>

        <Divider />
        <Text style={custom.centerSubtitle}>Created at: {completedAt}</Text>

        <Divider />
        <Text style={custom.centerSubtitle}>Expires at: {expiresAt}</Text>
      </PaddedContainer>
    </View>
  );
};

CompletedHealthSurvey.propTypes = {
  survey: PropTypes.object.isRequired,
};

CompletedHealthSurvey.defaultProps = {};

export default CompletedHealthSurvey;
