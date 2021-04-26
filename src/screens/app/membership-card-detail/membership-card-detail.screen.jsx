import React from 'react';
import { TouchableOpacity, View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Divider, ListItem, Text, Avatar, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { getMembershipCardImage } from '../../../components/molecules/membership-card/utils';
import { MembershipCardBalance, Modal } from '../../../components';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { refreshMembershipCardBalanceAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { useRefreshHeaderButton } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

const MembershipCardDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentMembershipCard, isLoading } = useSelector(membershipCardSelector);
  const membershipCardImage = getMembershipCardImage(currentMembershipCard.tierName);
  const balance = { balance: currentMembershipCard.balanceFormat };

  const showDisclaimerAlert = () =>
    Alert.alert(
      'Disclaimer',
      'This is your daily point balance, and is subject to change based on amounts already spent on the day.',
    );

  const _navigateToTopUp = () => navigation.navigate('TopUp', balance);
  const _navigateToPayOut = () => navigation.navigate('PayOut', balance);

  useRefreshHeaderButton(() => {
    dispatch(refreshMembershipCardBalanceAction());
  }, isLoading);

  const PointsBalance = () => (
    <>
      <PaddedContainer>
        <View style={styles.pointsBalanceContainer}>
          <Text h4>Points Balances</Text>
          <TouchableOpacity onPress={showDisclaimerAlert}>
            <Icon
              name="info"
              type="font-awesome-5"
              size={8}
              color={colors.white}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </PaddedContainer>
      <MembershipCardBalance
        name="Leisure Points"
        value={_.get(currentMembershipCard, 'pointsBalance', 0)}
      />
      <MembershipCardBalance
        name="Bonus Points"
        value={_.get(currentMembershipCard, 'bonusPointsBalance', 0)}
      />
      <MembershipCardBalance
        name="FreePlay"
        value={_.get(currentMembershipCard, 'freePlayBalance', 0)}
      />
    </>
  );

  return (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Winners Circle Card</Text>
      </PaddedContainer>
      <ListItem bottomDivider>
        <Avatar size="medium" imageProps={{ resizeMode: 'contain' }} source={membershipCardImage} />
        <ListItem.Content>
          <ListItem.Title h4>{currentMembershipCard.cardNumber}</ListItem.Title>
          <ListItem.Subtitle>{currentMembershipCard.tierName}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <MembershipCardBalance
        name="Player Balance"
        value={_.get(currentMembershipCard, 'balanceFormat', 'R0.00')}
      />
      <PaddedContainer>
        <Button title="Top Up" onPress={_navigateToTopUp} />
        <Divider />
        <Button title="Pay Out" onPress={_navigateToPayOut} />
      </PaddedContainer>
      <PointsBalance />
      <Modal
        visible={isLoading}
        transparent
        backgroundFade
        backgroundFadeColor={colors.whiteTransparent}
      >
        <View>
          <ActivityIndicator animating size="large" color={colors.gold} />
        </View>
      </Modal>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: colors.black,
    borderRadius: 40,
    flex: 1,
    height: 15,
    justifyContent: 'center',
    marginLeft: 5,
    width: 15,
  },
  pointsBalanceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

MembershipCardDetailScreen.propTypes = {};

MembershipCardDetailScreen.defaultProps = {};

export default MembershipCardDetailScreen;
