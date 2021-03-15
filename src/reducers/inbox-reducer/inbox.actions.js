import { setIsLoadingAction, setInboxAction } from './inbox.reducer';
import { inboxService } from '../../services';

export const getInbox = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return inboxService
      .getInbox()
      .then((inbox) => dispatch(setInboxAction(inbox)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const seeInbox = (inboxLinkId) => {
  return () => inboxService.seeInbox(inboxLinkId);
};
