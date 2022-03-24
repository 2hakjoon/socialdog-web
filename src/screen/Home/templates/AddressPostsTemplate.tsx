import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import NoContents from 'screen/common-comp/no-contents/NoContents';
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
    // 에러 없을때, 로딩중아닐때, 마지막페이지 아닐때, posts가 있을때, posts.length랑 pageLimit이 같을때
    if (postsError || postsLoading || isLastPage || !posts || !posts?.length) {
      return;
    }

    // 캐시에 데이터가 있을때, pagelimit만 변경.
    if (postDatas.getPostsByAddress.length > postsLimit) {
      setPostsLimit((prev) => prev + pageItemCount);
      return;
    }

    const lastPost = posts[posts.length - 1];
    const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
    fetchMore({
      variables: {
        page: {
          take: pageItemCount,
          cursor,
        },
      },
    }).then((data) => {
      if (data.data.getPostsByAddress.length !== pageItemCount) {
        setPostsLimit((prev) => prev + pageItemCount);
        setIsLastPage(true);
      }
    });
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
        {!postsLoading && !posts?.length && <NoContents />}
      </WrapperColumn>
    </WrapperColumn>
  );
}

export default AddressPostsTemplate;
