import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import { addressTermState } from 'apollo-setup';
import React, { useEffect, useState } from 'react';
import NoContents from 'screen/common-comp/no-contents/NoContents';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';
import { IPlaceTerms } from 'types/GooglePlace';
import { QGetPostsByAddress, QGetPostsByAddressVariables } from '__generated__/QGetPostsByAddress';
import AddressSelector from '../components/AddressSelector';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';
import RefreshButton from '../components/RefreshButton';

function AddressPostsTemplate() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>(addressTermState());
  const address = searchAddressTerms?.map((term) => term.value).join(' ') || '대한민국';
  const getPostsByAddress = useQuery<QGetPostsByAddress, QGetPostsByAddressVariables>(GET_POSTS_BY_ADDRESS, {
    variables: {
      address,
      page: {
        take: itemLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const posts = getPostsByAddress.data?.getPostsByAddress.data;

  const refreshPosts = () => {
    console.log('asdf');
  };

  useEffect(() => {
    setItemLimit(pageItemCount);
  }, [searchAddressTerms]);

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'} w={'100%'}>
        <RefreshButton onClick={refreshPosts} />
        <WrapperInfinityQueryScroll
          query={getPostsByAddress}
          pageItemCount={pageItemCount}
          setItemLimit={setItemLimit}
          itemLimit={itemLimit}
          isLastPage={isLastPage}
          setIsLastPage={setIsLastPage}
        >
          {posts?.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
          {getPostsByAddress.loading &&
            Array(pageItemCount)
              .fill('')
              .map(() => <PostCardLoading key={Math.random()} />)}
        </WrapperInfinityQueryScroll>
        {!getPostsByAddress.loading && !posts?.length && (
          <NoContents text={`이 지역의 게시물은 아직 없어요. \n 다른 지역을 둘러보세요.`} />
        )}
      </WrapperColumn>
    </WrapperColumn>
  );
}

export default AddressPostsTemplate;
