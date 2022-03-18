import { useLazyQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { IPlaceTerms } from 'types/GooglePlace';
import { QGetPostsByAddress, QGetPostsByAddressVariables } from '__generated__/QGetPostsByAddress';
import AddressSelector from '../components/AddressSelector';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';

// const mockupAddress = [
//   { offset: 0, value: '대한민국' },
//   { offset: 5, value: '광주광역시' },
//   { offset: 11, value: '광산구' },
//   { offset: 15, value: '삼도동' },
//   { offset: 19, value: '대산로' },
//   { offset: 23, value: '눈보뛰' },
// ];

function AddressPostsTemplate() {
  const pageItemCount = 6;
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>();
  const address = searchAddressTerms?.map((term) => term.value).join(' ');
  const [getPostsByAddress, { data: postDatas, loading: postsLoading, fetchMore }] = useLazyQuery<
    QGetPostsByAddress,
    QGetPostsByAddressVariables
  >(GET_POSTS_BY_ADDRESS, { notifyOnNetworkStatusChange: true });
  const posts = postDatas?.getPostsByAddress.data;

  const getPosts = async () => {
    if (!address) {
      return;
    }
    console.log(address);
    const res = await getPostsByAddress({
      variables: { args: { address }, page: { offset: 0, limit: pageItemCount } },
    });
    console.log(res);
  };

  const getNextPage = async () => {
    if (!address || !posts) {
      return;
    }
    await fetchMore({ variables: { args: { address }, page: { offset: 0, limit: pageItemCount } } });
    await getPostsByAddress({
      variables: { args: { address }, page: { offset: posts.length, limit: posts.length + pageItemCount } },
    });
  };

  useEffect(() => {
    console.log(searchAddressTerms);
    if (address) {
      getPosts();
    }
  }, [searchAddressTerms]);

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'} w={'100%'}>
        <WrapperInfinityScroll fetchHandler={getNextPage}>
          {posts?.map((post) => (
            <PostCard {...post} />
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
