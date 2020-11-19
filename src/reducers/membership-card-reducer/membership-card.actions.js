import { setMembershipCardsAction } from './membership-card.reducer';
import { membershipCardService } from '../../services';

export const getMembershipCardsAction = () => {
  return (dispatch) => {
    return membershipCardService.getMembershipCards().then((_membershipCards) => {
      dispatch(setMembershipCardsAction(_membershipCards));
    });
  };
};
