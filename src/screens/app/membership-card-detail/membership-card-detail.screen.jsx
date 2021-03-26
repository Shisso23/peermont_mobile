import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, ListItem, Text, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { getMembershipCardImage } from '../../../components/molecules/membership-card/utils';
import { custom } from '../../../../theme/theme.styles';

const MembershipCardDetailScreen = () => {
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);
  const navigation = useNavigation();
  const membershipCardImage = getMembershipCardImage(currentMembershipCard.tierName);

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
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title h4>Player Balance</ListItem.Title>
        </ListItem.Content>
        <Text h4>{currentMembershipCard.balanceFormat}</Text>
      </ListItem>
      <PaddedContainer>
        <Button
          title="Top Up"
          onPress={() =>
            navigation.navigate('TopUp', { balance: currentMembershipCard.balanceFormat })
          }
        />
        <Divider />
        <Button
          title="Pay Out"
          onPress={() =>
            navigation.navigate('PayOut', { balance: currentMembershipCard.balanceFormat })
          }
        />
      </PaddedContainer>
      <Divider />
      <PaddedContainer>
        <Text h4>Points Balances</Text>
      </PaddedContainer>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Leisure Points Balance</ListItem.Title>
        </ListItem.Content>
        <Text h4>{currentMembershipCard.pointsBalance}</Text>
      </ListItem>
    </ScrollContainer>
  );
};

MembershipCardDetailScreen.propTypes = {};

MembershipCardDetailScreen.defaultProps = {};

export default MembershipCardDetailScreen;
