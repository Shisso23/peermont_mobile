import React, { useEffect } from 'react';
import { Dimensions, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { custom } from '../../../../theme/theme.styles';
import { Jackpot, LoadingComponent } from '../../../components/molecules';
import { jackpotListSelector } from '../../../reducers/jackpot-list-reducer/jackpot-list.reducer';
import {
  getJackpotsAction,
  getJackpotsByCasinoAction,
  getJackpotsByMachineAction,
  getJackpotsByRangeAction,
} from '../../../reducers/jackpot-list-reducer/jackpot-list.actions';
import { JackpotListForm } from '../../../components/forms';
import { jackpotFormModel } from '../../../models';
import { jackpotCasinoCodeList } from '../../../helpers/casino-dropdown-helper';

const { width: screenWidth } = Dimensions.get('window');

const JackpotListScreen = () => {
  const dispatch = useDispatch();
  const casinos = jackpotCasinoCodeList;
  const { jackpots, isLoading } = useSelector(jackpotListSelector);

  const renderJackpotCard = ({ item }) => <Jackpot jackpotData={item} />;

  const _handleFormSubmit = (formData) => {
    if (!_.isNull(formData.casino) && _.isNull(formData.machine))
      dispatch(getJackpotsByCasinoAction(casinos[formData.casino]));
    if (!_.isNull(formData.casino) && !_.isNull(formData.machine))
      dispatch(getJackpotsByMachineAction(casinos[formData.casino], formData.machine));
    if (!_.isNull(formData.range))
      dispatch(getJackpotsByRangeAction(formData.range[0], formData.range[1]));
  };

  useEffect(() => {
    dispatch(getJackpotsAction());
  }, []);

  return isLoading ? (
    <View style={custom.loaderMargin}>
      <LoadingComponent hasBackground={false} />
    </View>
  ) : (
    <SafeAreaView>
      <Text style={[custom.centerTitle, custom.topPadding]}>Jackpot List</Text>
      <View style={custom.center}>
        <JackpotListForm initialValues={jackpotFormModel()} submitForm={_handleFormSubmit} />
        <FlatList
          style={[styles.jackpotDimensions, custom.jackpotScrolViewMargin]}
          data={jackpots}
          renderItem={renderJackpotCard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jackpotDimensions: {
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

JackpotListScreen.propTypes = {};

JackpotListScreen.defaultProps = {};

export default JackpotListScreen;
