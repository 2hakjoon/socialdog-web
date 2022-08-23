import { useQuery } from '@apollo/client';
import { GET_MY_LIKED_POSTS } from 'apllo-gqls/posts';
import { QGetMyLikedPosts, QGetMyLikedPostsVariables } from '__generated__/QGetMyLikedPosts';

interface UseMyLikedPostsArgs {
  itemLimit: number;
}

function useMyLikedPosts({ itemLimit }: UseMyLikedPostsArgs) {
  return useQuery<QGetMyLikedPosts, QGetMyLikedPostsVariables>(GET_MY_LIKED_POSTS, {
    variables: { page: { take: itemLimit } },
    notifyOnNetworkStatusChange: true,
  });
}

export default useMyLikedPosts;
