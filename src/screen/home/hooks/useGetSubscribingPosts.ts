import { useQuery } from '@apollo/client';
import { GET_SUBSCRIBING_POSTS } from 'apllo-gqls/posts';
import { QGetSubscribingPosts } from '__generated__/QGetSubscribingPosts';

interface UseGetSubscribingPostsArgs {
  itemLimit: number;
}

function useGetSubscribingPosts({ itemLimit }: UseGetSubscribingPostsArgs) {
  return useQuery<QGetSubscribingPosts>(GET_SUBSCRIBING_POSTS, {
    variables: {
      page: {
        take: itemLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    onError: (e) => console.log(e),
  });
}

export default useGetSubscribingPosts;
