import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { prettyOutputText } from '../../../dev-utils';

const CompletedHealthSurvey = ({ survey }) => {
  return <View>{prettyOutputText(survey)}</View>;
};

CompletedHealthSurvey.propTypes = {
  survey: PropTypes.object.isRequired,
};

CompletedHealthSurvey.defaultProps = {};

export default CompletedHealthSurvey;
