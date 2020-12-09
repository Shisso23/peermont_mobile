import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCurrentMembershipCardAction } from '../../reducers/membership-card-reducer/membership-card.reducer';

export const useMembershipCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const viewMembershipCard = (id) => {
    dispatch(setCurrentMembershipCardAction(id));
    navigation.navigate('EnterMembershipCardPin');
  };

  return {
    viewMembershipCard,
  };
};
