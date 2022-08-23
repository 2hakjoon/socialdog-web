import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import { QGetUserPosts, QGetUserPostsVariables } from '__generated__/QGetUserPosts';

interface UseMyPostsArgs {
  username: string;
  itemLimit: number;
}

function useMyPosts({ username, itemLimit }: UseMyPostsArgs) {
  return useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { take: itemLimit } },
    notifyOnNetworkStatusChange: true,
  });
}

export default useMyPosts;
