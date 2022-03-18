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
  const [getPostsByAddress, { data: postDatas, loading: postsLoading, fetchMore }] = useLazyQuery<
    QGetPostsByAddress,
    QGetPostsByAddressVariables
  >(GET_POSTS_BY_ADDRESS);
  const posts = postDatas?.getPostsByAddress.data;

  const getPosts = async () => {
    if (!searchAddressTerms) {
      return;
    }
    const address = searchAddressTerms.map((term) => term.value).join(' ');
    console.log(address);
    const res = await getPostsByAddress({ variables: { args: { address }, page: { offset: 0, limit: 6 } } });
    console.log(res);
  };
  useEffect(() => {
    console.log(searchAddressTerms);
    if (searchAddressTerms?.length) {
      getPosts();
    }
  }, [searchAddressTerms]);

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'}>
        {posts && (
          <WrapperInfinityScroll enableFetch={false} fetchHandler={() => {}}>
            {posts.map((post) => (
              <PostCard {...post} />
            ))}
          </WrapperInfinityScroll>
        )}
      </WrapperColumn>
    </WrapperColumn>
  );
}

export default AddressPostsTemplate;
