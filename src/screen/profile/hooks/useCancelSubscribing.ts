import { useMutation } from '@apollo/client';
import { CANCEL_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { McancelSubscribing, McancelSubscribingVariables } from '__generated__/McancelSubscribing';

function useCancelSubscribing() {
  return useMutation<McancelSubscribing, McancelSubscribingVariables>(CANCEL_SUBSCRIBE);
}
export default useCancelSubscribing;
