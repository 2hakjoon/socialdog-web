import { useMutation } from '@apollo/client';
import { RESPONSE_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { MResponseSubscribe, MResponseSubscribeVariables } from '__generated__/MResponseSubscribe';

function useResponseSubscribe() {
  return useMutation<MResponseSubscribe, MResponseSubscribeVariables>(RESPONSE_SUBSCRIBE);
}

export default useResponseSubscribe;
