import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { IPlaceTerms } from 'types/GooglePlace';
import { CursorInput } from '__generated__/globalTypes';
import { QGetPostsByAddress, QGetPostsByAddressVariables } from '__generated__/QGetPostsByAddress';
import AddressSelector from '../components/AddressSelector';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';

function AddressPostsTemplate() {
  const pageItemCount = 6;
  const [isLastPage, setIsLastPage] = useState(false);
  const [postsLimit, setPostsLimit] = useState(pageItemCount);
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>();
  const address = searchAddressTerms?.map((term) => term.value).join(' ') || '대한민국';
  const {
    data: postDatas,
    loading: postsLoading,
    error: postsError,
    fetchMore,
  } = useQuery<QGetPostsByAddress, QGetPostsByAddressVariables>(GET_POSTS_BY_ADDRESS, {
    variables: {
      address,
      page: {
        take: postsLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const posts = postDatas?.getPostsByAddress.data;

  useEffect(() => {
    setPostsLimit(pageItemCount);
  }, [searchAddressTerms]);

  const getNextPage = async () => {
    if (!postsError && posts?.length && !isLastPage && !postsLoading) {
      const lastPost = posts[posts.length - 1];
      const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
      const res = await fetchMore({
        variables: {
          page: {
            take: pageItemCount,
            cursor,
          },
        },
      });
      if (res.data.getPostsByAddress.data.length !== pageItemCount) {
        setIsLastPage(true);
      }
    }
    setPostsLimit((prev) => prev + pageItemCount);
  };

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'} w={'100%'}>
        <WrapperInfinityScroll fetchHandler={getNextPage}>
          {posts?.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
          {postsLoading &&
            Array(pageItemCount)
              .fill('')
              .map(() => <PostCardLoading key={Math.random()} />)}
        </WrapperInfinityScroll>
      </WrapperColumn>
    </WrapperColumn>
  );
}

export default AddressPostsTemplate;
