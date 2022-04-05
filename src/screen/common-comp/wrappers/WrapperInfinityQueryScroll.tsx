import { QueryResult } from '@apollo/client';
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { CursorArgs } from '__generated__/globalTypes';

const Wrapper = styled.div`
  height: 4px;
  width: 100%;
`;

interface IQueryResult {
  [k: string]: {
    data: [{ id: string; createdAt: string }];
    ok: boolean;
    error: string;
  };
}

interface IWrapperInfinityScroll {
  children: ReactNode;
  query: QueryResult<any>;
  // query: QueryResult<IQueryResult>;
  pageItemCount?: number;
  itemLimit: number;
  setItemLimit: Dispatch<SetStateAction<number>>;
}

function WrapperInfinityQueryScroll({
  children,
  query: { error, loading, data, fetchMore },
  pageItemCount = 6,
  itemLimit,
  setItemLimit,
}: IWrapperInfinityScroll) {
  const [isLastPage, setIsLastPage] = useState(false);
  const { ref, inView, entry } = useInView({
    // rootMargin: '-100px',
    threshold: 0,
  });

  // 무한스크롤 handling함수
  const fetchNextPage = async () => {
    const items = data[Object.keys(data)[0]].data;
    // console.log(error, loading, isLastPage, items);
    // 에러 없을때, 로딩중아닐때, 마지막페이지 아닐때, posts가 있을때, posts.length랑 pageLimit이 같을때
    if (error || loading || isLastPage || !items || !items.length) {
      return;
    }
    // 캐시에 데이터가 있을때, pagelimit만 변경.
    if (items.length > itemLimit) {
      setItemLimit((prev) => prev + pageItemCount);
      return;
    }

    const lastPost = items[items.length - 1];
    const cursor: CursorArgs = { id: lastPost.id, createdAt: lastPost.createdAt };
    fetchMore({
      variables: {
        page: {
          take: pageItemCount,
          cursor,
        },
      },
    }).then(({ data }) => {
      // console.log(data);
      console.log(data[Object.keys(data)[0]].data);
      if (data[Object.keys(data)[0]].data?.length !== pageItemCount) {
        setIsLastPage(true);
      }
      setItemLimit((prev) => prev + pageItemCount);
    });
  };

  useEffect(() => {
    // console.log(inView);
    // console.log('infinity', enableFetch);
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {children}
      <Wrapper ref={ref} />
    </>
  );
}

WrapperInfinityQueryScroll.defaultProps = {
  pageItemCount: 6,
};

export default WrapperInfinityQueryScroll;
