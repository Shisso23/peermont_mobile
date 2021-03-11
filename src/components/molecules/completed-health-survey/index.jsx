import React from 'react';
import { View } from 'react-native';
import { Divider, Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';

const CompletedHealthSurvey = ({ survey }) => {
  const allowed = _.get(survey, 'allowed');
  const hasExpired = _.get(survey, 'hasExpired');
  const completedAt = moment(_.get(survey, 'created_at')).format('YYYY-MM-DD HH:mm:ss');
  const expiresAt = moment(_.get(survey, 'created_at')).add('8', 'h').format('YYYY-MM-DD HH:mm:ss');

  const successText = 'Thanks for your answers, please show this screen to the guards upon entry.';

  const failedText =
    'Thanks for your answers, unfortunately we have identified a possible risk in your assessment and cannot allow access.';

  const success = allowed && !hasExpired;

  return (
    <View>
      <Divider />
      <Text style={custom.centerSubtitle}>{success ? successText : failedText}</Text>

      <Divider />
      {success ? (
        <Icon type="font-awesome-5" name="check" color={colors.success} size={200} />
      ) : (
        <Icon type="font-awesome-5" name="times" color={colors.danger} size={200} />
      )}

      <Divider />
      <Text style={custom.centerSubtitle}>
        {success ? 'This screen is valid for 8 hours' : null}
      </Text>

      <Divider />
      <Text style={custom.centerSubtitle}>Created at: {completedAt}</Text>

      <Divider />
      <Text style={custom.centerSubtitle}>Expires at: {expiresAt}</Text>
    </View>
  );
};

CompletedHealthSurvey.propTypes = {
  survey: PropTypes.object.isRequired,
};

CompletedHealthSurvey.defaultProps = {};

export default CompletedHealthSurvey;
