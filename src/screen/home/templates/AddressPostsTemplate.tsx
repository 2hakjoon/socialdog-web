import { makeReference, useApolloClient } from '@apollo/client';
import { addressTermState } from 'apollo-setup';
import React, { useEffect, useState } from 'react';
import NoContents from 'common/components/no-contents/NoContents';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperInfinityQueryScroll from 'common/components/wrappers/WrapperInfinityQueryScroll';
import { IPlaceTerms } from 'types/GooglePlace';
import AddressSelector from '../components/AddressSelector';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';
import RefreshButton from '../components/RefreshButton';
import useGetPostsByAddress from '../hooks/useGetPostsByAddress';

function AddressPostsTemplate() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const [isLastPage, setIsLastPage] = useState(false);
  const client = useApolloClient();
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>(addressTermState());
  const address = searchAddressTerms?.map((term) => term.value).join(' ') || '대한민국';
  const getPostsByAddress = useGetPostsByAddress({ address, itemLimit });
  const posts = getPostsByAddress.data?.getPostsByAddress.data;

  const removeAddressPosts = () => {
    client.cache.modify({
      id: client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getPostsByAddress() {
          return undefined;
        },
      },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLastPage(false);
  };

  useEffect(() => {
    setItemLimit(pageItemCount);
  }, [searchAddressTerms]);

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'} w={'100%'}>
        <RefreshButton onClick={removeAddressPosts} />
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
