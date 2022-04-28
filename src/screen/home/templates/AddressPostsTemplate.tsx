import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_ADDRESS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import NoContents from 'screen/common-comp/no-contents/NoContents';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { IPlaceTerms } from 'types/GooglePlace';
import { CursorArgs } from '__generated__/globalTypes';
import { QGetPostsByAddress, QGetPostsByAddressVariables } from '__generated__/QGetPostsByAddress';
import AddressSelector from '../components/AddressSelector';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';

function AddressPostsTemplate() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>();
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

  useEffect(() => {
    setItemLimit(pageItemCount);
  }, [searchAddressTerms]);

  return (
    <WrapperColumn>
      <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />
      <WrapperColumn p={'0 8px'} w={'100%'}>
        <WrapperInfinityQueryScroll
          query={getPostsByAddress}
          pageItemCount={pageItemCount}
          setItemLimit={setItemLimit}
          itemLimit={itemLimit}
        >
          {posts?.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
          {getPostsByAddress.loading &&
            Array(pageItemCount)
              .fill('')
              .map(() => <PostCardLoading key={Math.random()} />)}
        </WrapperInfinityQueryScroll>
        {!getPostsByAddress.loading && !posts?.length && <NoContents />}
      </WrapperColumn>
    </WrapperColumn>
  );
}

export default AddressPostsTemplate;