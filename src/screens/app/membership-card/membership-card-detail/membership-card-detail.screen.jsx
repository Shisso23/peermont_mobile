import React from 'react';
import { TouchableOpacity, View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Divider, ListItem, Text, Avatar, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../../components/containers';
import { getMembershipCardImage } from '../../../../components/molecules/membership-card/utils';
import { MembershipCardBalance, Modal } from '../../../../components';
import { membershipCardSelector } from '../../../../reducers/membership-card-reducer/membership-card.reducer';
import { refreshMembershipCardBalanceAction } from '../../../../reducers/membership-card-reducer/membership-card.actions';
import { useRefreshHeaderButton } from '../../../../hooks';
import { custom } from '../../../../../theme/theme.styles';
import colors from '../../../../../theme/theme.colors';

const MembershipCardDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentMembershipCard, isLoading, isLoadingPoints, pointsBalances } =
    useSelector(membershipCardSelector);
  const membershipCardImage = getMembershipCardImage(currentMembershipCard.tierName);
  const balance = currentMembershipCard.balanceFormat;
  const dailyTopUpLimitLeft = _.get(currentMembershipCard, 'dailyTopUpLimitLeft');

  const showDisclaimerAlert = () =>
    Alert.alert(
      'Disclaimer',
      'This is your daily point balance, and is subject to change based on amounts already spent on the day.',
    );

  const _navigateToTopUp = () => navigation.navigate('TopUp', { balance, dailyTopUpLimitLeft });
  const _navigateToPayOut = () => navigation.navigate('PayOut', { balance });

  useRefreshHeaderButton(() => {
    dispatch(refreshMembershipCardBalanceAction());
  }, isLoading);

  const PointsBalance = () => {
    const pointsBalance = _.get(pointsBalances, 'pointsBalance', 0);
    const bonusPointsBalance = _.get(pointsBalances, 'bonusPointsBalance', 0);
    const freePlayBalance = _.get(pointsBalances, 'freePlayBalance', 0);

    const pointsNil = _.isNil(pointsBalance);
    const bonusPointsNil = _.isNil(bonusPointsBalance);
    const freePlayNil = _.isNil(freePlayBalance);
    const allBalancesNil = _.isNil(pointsNil && bonusPointsNil && freePlayBalance);

    return (
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
        {isLoadingPoints ? (
          <ActivityIndicator animating size="large" color={colors.gold} />
        ) : (
          <>
            {!pointsNil && <MembershipCardBalance name="Leisure Points" value={pointsBalance} />}
            {!bonusPointsNil && (
              <MembershipCardBalance name="Bonus Points" value={bonusPointsBalance} />
            )}
            {!freePlayNil && <MembershipCardBalance name="FreePlay" value={freePlayBalance} />}
            {allBalancesNil && <Text style={custom.centerSubtitle}>No points to show</Text>}
          </>
        )}
      </>
    );
  };

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
