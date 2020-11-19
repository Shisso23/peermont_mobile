import React, { useEffect } from 'react';
import { Text, ListItem } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';

const { CancelToken } = axios;

const HomeScreen = () => {
  const requestSource = CancelToken.source();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  }, []);

  return (
    <ScrollContainer>
      <Text h4>{user.firstName}</Text>
      {membershipCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.cardNumber}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
