import React, { useEffect } from 'react';
import { Dimensions, View, FlatList, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { custom } from '../../../../theme/theme.styles';
import { Jackpot, LoadingComponent } from '../../../components/molecules';
import { jackpotListSelector } from '../../../reducers/jackpot-list-reducer/jackpot-list.reducer';
import {
  getJackpotsAction,
  getJackpotsByCasinoAction,
  getJackpotsByMachineAction,
} from '../../../reducers/jackpot-list-reducer/jackpot-list.actions';
import { JackpotListForm } from '../../../components/forms';
import { jackpotFormModel } from '../../../models';

const data = [
  {
    id: 1,
    name: 'Test 1',
    machine: '1234',
  },
];

const { width: screenWidth } = Dimensions.get('window');

const JackpotListScreen = () => {
  const dispatch = useDispatch();
  const casinos = ['EP', 'FI', 'GL', 'GP', 'KH', 'MP', 'RC', 'TM', 'UM'];
  const { jackpots, isLoading } = useSelector(jackpotListSelector);

  const renderJackpotCard = ({ item }) => <Jackpot jackpotData={item} />;

  const _handleFormSubmit = (formData) => {
    if (!_.isNull(formData.casino) && _.isNull(formData.machine))
      dispatch(getJackpotsByCasinoAction(casinos[formData.casino]));
    if (!_.isNull(formData.casino) && !_.isNull(formData.machine))
      dispatch(getJackpotsByMachineAction(casinos[formData.casino], formData.machine));
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
      <View style={custom.headerContainer}>
        <JackpotListForm initialValues={jackpotFormModel()} submitForm={_handleFormSubmit} />
        <ScrollView style={custom.jackpotScrolViewMargin}>
          <FlatList
            style={styles.jackpotDimensions}
            scrollEnabled={data.length > 4}
            data={jackpots}
            renderItem={renderJackpotCard}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jackpotDimensions: {
    width: screenWidth * 0.9,
  },
});

JackpotListScreen.propTypes = {};

JackpotListScreen.defaultProps = {};

export default JackpotListScreen;
