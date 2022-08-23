import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import { QGetPostsByAddress, QGetPostsByAddressVariables } from '__generated__/QGetPostsByAddress';

interface useGetPostsByAddressInterface {
  address: string
  itemLimit: number
}

function useGetPostsByAddress({address, itemLimit }: useGetPostsByAddressInterface) {
  return useQuery<QGetPostsByAddress, QGetPostsByAddressVariables>(GET_POSTS_BY_ADDRESS, {
    variables: {
      address,
      page: {
        take: itemLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
}

export default useGetPostsByAddress;
