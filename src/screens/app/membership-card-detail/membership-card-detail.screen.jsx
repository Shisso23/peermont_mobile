import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Divider, Card, ListItem, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PageContainer } from '../../../components/containers';
import { getMembershipCardImage } from '../../../components/molecules/membership-card/utils';

const MembershipCardDetailScreen = () => {
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);
  const navigation = useNavigation();
  const membershipCardImage = getMembershipCardImage(currentMembershipCard.tierName);
  return (
    <PageContainer>
      <Card>
        <Card.Title>{currentMembershipCard.cardNumber}</Card.Title>
        <Card.Image style={styles.imageStyle} resizeMode="contain" source={membershipCardImage} />
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Player Balance</ListItem.Title>
          </ListItem.Content>
          <Text>{currentMembershipCard.balanceFormat}</Text>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Leisure Points Balance</ListItem.Title>
          </ListItem.Content>
          <Text>{currentMembershipCard.pointsBalance}</Text>
        </ListItem>

        <View style={styles.rowView}>
          <Button title="Top up" onPress={() => navigation.push('TopUp')} />
          <Button title="Pay out" onPress={() => navigation.push('PayOut')} />
        </View>
      </Card>

      <Divider />
      <Divider />
    </PageContainer>
  );
};

MembershipCardDetailScreen.propTypes = {};

MembershipCardDetailScreen.defaultProps = {};

const styles = StyleSheet.create({
  imageStyle: { height: 150 },
  rowView: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default MembershipCardDetailScreen;
