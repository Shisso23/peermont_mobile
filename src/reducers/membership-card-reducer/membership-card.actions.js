import { setLoadingAction } from '../user-reducer/user.reducer';
import { setMembershipCardsAction, removeMembershipCardAction } from './membership-card.reducer';
import { membershipCardService } from '../../services';

export const getMembershipCardsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return membershipCardService.getMembershipCards().then((_membershipCards) => {
      dispatch(setMembershipCardsAction(_membershipCards));
      dispatch(setLoadingAction(false));
    });
  };
};

export const deleteMembershipCardAction = (id) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return membershipCardService.deleteMembershipCard(id).then(() => {
      dispatch(removeMembershipCardAction());
      dispatch(setLoadingAction(false));
    });
  };
};
