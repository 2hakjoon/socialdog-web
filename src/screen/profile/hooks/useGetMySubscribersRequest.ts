import { useQuery } from '@apollo/client';
import { GET_MY_SUBSCRIBERS_REQUESTS } from 'apllo-gqls/subscribes';
import { QGetMySubscribersRequests } from '__generated__/QGetMySubscribersRequests';

function useGetMySubscribersRequest() {
  const { data, loading: mySubscriberRequestsLoading } =
    useQuery<QGetMySubscribersRequests>(GET_MY_SUBSCRIBERS_REQUESTS);
  return {
    subscribers: data?.getSubscribeRequests.data,
    subscribeRequests: data?.getSubscribeRequests.data,
    mySubscriberRequestsLoading,
  };
}

export default useGetMySubscribersRequest;
