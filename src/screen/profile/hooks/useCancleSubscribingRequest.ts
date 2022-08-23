import { useMutation } from '@apollo/client';
import { CANCEL_SUBSCRIBE_REQUEST } from 'apllo-gqls/subscribes';
import { MCancelSubscribingRequest, MCancelSubscribingRequestVariables } from '__generated__/MCancelSubscribingRequest';

function useCancleSubscribingRequest() {
  return useMutation<MCancelSubscribingRequest, MCancelSubscribingRequestVariables>(CANCEL_SUBSCRIBE_REQUEST);
}

export default useCancleSubscribingRequest;
