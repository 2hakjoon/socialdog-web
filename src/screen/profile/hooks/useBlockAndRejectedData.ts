import { useQuery } from '@apollo/client';
import { GET_BLOCK_REJECTED } from 'apllo-gqls/subscribes';
import { QGetMyBlockAndReject } from '__generated__/QGetMyBlockAndReject';

function useBlockAndRejectedData() {
  const { data } = useQuery<QGetMyBlockAndReject>(GET_BLOCK_REJECTED);
  return { blockingUsers: data?.getMyBlockingUsers.data, rejectedUsers: data?.getMyRejectRequests.data };
}

export default useBlockAndRejectedData;
