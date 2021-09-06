import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import moment from 'moment';

import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import LoadingComponent from '../loading/loading.component';

const HealthSurvey = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { lastHealthSurvey, isLoading } = useSelector((reducers) => reducers.healthSurveyReducer);
  const defaultHealthSurveyCard = _.isEmpty(lastHealthSurvey) || lastHealthSurvey?.hasExpired;

  const allowed = _.get(lastHealthSurvey, 'allowed');
  const hasExpired = _.get(lastHealthSurvey, 'hasExpired');
  const completedAt = moment(_.get(lastHealthSurvey)).format('YYYY-MM-DD HH:mm');
  const expiresAt = moment(_.get(lastHealthSurvey)).add('8', 'h').format('YYYY-MM-DD HH:mm');

  const successTextTitle = 'Pass valid';
  const failedTextTitle = 'Pass invalid';
  const failedTextSubTitle = 'A possible risk has been identified';
  const successTextSubTitle = `${completedAt} - ${expiresAt}`;

  const success = allowed && !hasExpired;

  useEffect(() => {
    dispatch(initiateHealthSurveyAction());
  }, []);

  const _handleHealthSurveyPress = () => {
    navigation.navigate('HealthSurvey');
  };

  const SurveyViewContainer = ({ children }) => {
    return (
      <TouchableOpacity style={custom.headerButton} onPress={_handleHealthSurveyPress}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingComponent hasBackground={false} />
          </View>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  };

  SurveyViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return defaultHealthSurveyCard ? (
    <SurveyViewContainer>
      <Icon style={custom.healthIcon} name="file-medical" size={35} color={colors.primary} />
      <View style={custom.surveyText}>
        <Text style={custom.surveyTitle}>Health Survey</Text>
        <Text style={custom.surveySubText}>Submit Online</Text>
      </View>
    </SurveyViewContainer>
  ) : (
    <SurveyViewContainer>
      {success ? (
        <Icon
          style={custom.statusIcon}
          type="font-awesome-5"
          name="check"
          color={colors.success}
          size={35}
        />
      ) : (
        <Icon
          style={custom.statusIcon}
          type="font-awesome-5"
          name="times"
          color={colors.danger}
          size={40}
        />
      )}
      <View style={custom.surveyText}>
        <Text style={custom.surveyTitle}>{success ? successTextTitle : failedTextTitle}</Text>
        <Text style={custom.surveySubText}>
          {success ? successTextSubTitle : failedTextSubTitle}
        </Text>
      </View>
    </SurveyViewContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 12,
  },
});

HealthSurvey.propTypes = {};
HealthSurvey.defaultProps = {};

export default HealthSurvey;
