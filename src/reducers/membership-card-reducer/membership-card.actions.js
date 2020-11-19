import { setMembershipCardsAction, removeMembershipCardAction } from './membership-card.reducer';
import { membershipCardService } from '../../services';

export const getMembershipCardsAction = () => {
  return (dispatch) => {
    return membershipCardService.getMembershipCards().then((_membershipCards) => {
      dispatch(setMembershipCardsAction(_membershipCards));
    });
  };
};

export const deleteMembershipCardAction = (id) => {
  return (dispatch) => {
    return membershipCardService.deleteMembershipCard(id).then(() => {
      dispatch(removeMembershipCardAction());
    });
  };
};
