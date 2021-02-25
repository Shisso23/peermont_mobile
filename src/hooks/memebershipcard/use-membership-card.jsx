import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { setCurrentMembershipCardAction } from '../../reducers/membership-card-reducer/membership-card.reducer';

export const useMembershipCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { membershipCardPins } = useSelector((reducers) => reducers.membershipCardReducer);

  const viewMembershipCard = (id, index) => {
    dispatch(setCurrentMembershipCardAction(id));
    navigation.navigate('EnterMembershipCardPin', {
      cardPin: _.get(membershipCardPins[index], 'card_pin'),
    });
  };

  return {
    viewMembershipCard,
  };
};
