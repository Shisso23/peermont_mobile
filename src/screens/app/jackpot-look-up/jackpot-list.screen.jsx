import React, { useState, useMemo } from 'react';
import { Dimensions, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text, SearchBar } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';
import { Jackpot } from '../../../components/molecules';
import { jackpotListSelector } from '../../../reducers/jackpot-list-reducer/jackpot-list.reducer';
import { getJackpotsAction } from '../../../reducers/jackpot-list-reducer/jackpot-list.actions';
import {
  getJackpotsByCasino,
  getJackpotsByMachine,
} from '../../../services/sub-services/jackpot-list-service/jackpot-list.service';

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
  const [machineNumber, setMachineNumber] = useState();
  const [casino, setCasino] = useState();
  const casinos = ['casino 1', 'casino 2', 'casino 3', 'casino 4'];
  const { jackpots } = useSelector(jackpotListSelector);

  const renderJackpotCard = ({ item }) => <Jackpot jackpotData={item} />;

  const updateSearch = (value) => {
    setMachineNumber(value);
  };

  const updateCasino = (index) => {
    setCasino(casinos[index]);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getJackpotsAction);
    }, []),
  );

  useMemo(() => {
    dispatch(getJackpotsByCasino(casino));
  }, [casino]);

  useMemo(() => {
    dispatch(getJackpotsByMachine(machineNumber));
  }, [machineNumber]);

  return (
    <SafeAreaView>
      <Text style={[custom.centerTitle, custom.topPadding]}>Jackpot List</Text>
      <View style={custom.headerContainer}>
        <View style={[styles.searchWidth, custom.headerContainer]}>
          <ModalDropdown
            options={casinos}
            style={[styles.searchWidth, styles.casinoSelector]}
            textStyle={custom.casinoSelectorText}
            dropdownStyle={styles.casinoSelectorDropdown}
            dropdownTextStyle={custom.casinoSelectorDropdownOptions}
            defaultValue="Please Select a casino"
            onSelect={(value) => updateCasino(value)}
          />
          <SearchBar
            placeholder="Type machine number here..."
            onChangeText={(value) => updateSearch(value)}
            value={machineNumber}
            round
            containerStyle={custom.searchContainer}
            inputStyle={custom.searchContainer}
            inputContainerStyle={custom.searchContainer}
            lightTheme
            clearIcon
          />
        </View>
        <FlatList
          style={styles.jackpotDimensions}
          scrollEnabled={data.length > 4}
          data={jackpots}
          renderItem={renderJackpotCard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  casinoSelector: {
    alignSelf: 'center',
    backgroundColor: colors.grey,
    borderRadius: 12,
    marginTop: 5,
    opacity: 0.5,
    padding: 10,
    width: screenWidth * 0.7,
  },
  casinoSelectorDropdown: {
    borderRadius: 12,
    height: 120,
    marginLeft: 0,
    marginTop: 20,
    width: screenWidth * 0.65,
  },
  jackpotDimensions: {
    width: screenWidth * 0.9,
  },
  searchWidth: {
    width: screenWidth * 0.8,
  },
});

JackpotListScreen.propTypes = {};

JackpotListScreen.defaultProps = {};

export default JackpotListScreen;
