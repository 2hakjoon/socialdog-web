import { useMutation } from "@apollo/client";
import { REQUEST_SUBSCRIBE } from "apllo-gqls/subscribes";
import { MRequestSubscribe, MRequestSubscribeVariables } from "__generated__/MRequestSubscribe";


function useRequestSubscribe () {
  return useMutation<MRequestSubscribe, MRequestSubscribeVariables>(REQUEST_SUBSCRIBE);
}

export default useRequestSubscribe