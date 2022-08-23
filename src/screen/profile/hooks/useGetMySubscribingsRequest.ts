import { useQuery } from '@apollo/client';
import { GET_MY_SUBSCRIBINGS_REQUESTS } from 'apllo-gqls/subscribes';
import { QGetMySubscribingsRequests } from '__generated__/QGetMySubscribingsRequests';

function useGetMySubscribingsRequest() {
  const { data, loading: mySubscribingsRequestsLoading } =
    useQuery<QGetMySubscribingsRequests>(GET_MY_SUBSCRIBINGS_REQUESTS);

  return {
    subscribingUsers: data?.getMySubscribings.data,
    subscribingRequests: data?.getSubscribingRequests.data,
    mySubscribingsRequestsLoading,
  };
}

export default useGetMySubscribingsRequest;
