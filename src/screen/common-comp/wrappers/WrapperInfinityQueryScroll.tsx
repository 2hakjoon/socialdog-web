import { QueryResult } from '@apollo/client';
import React, { Dispatch, ReactNode, SetStateAction, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { CursorArgs } from '__generated__/globalTypes';

const InViewWrapper = styled.div`
  height: 4px;
  width: 100%;
`;

interface IQueryResult {
  [k: string]: {
    data: [{ id: string; createdAt: string }];
    ok: boolean;
    error: string;
    length: number;
  };
}

interface IWrapperInfinityQueryScroll {
  children: ReactNode;
  // 코드 작성 끝나면 any로 변경,
  query: QueryResult<any>;
  // 코드 작성 중엔 IQueryResult로 변경.
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
}: IWrapperInfinityQueryScroll) {
  const [isLastPage, setIsLastPage] = useState(false);

  const { ref, inView, entry } = useInView({
    // rootMargin: '-100px',
    threshold: 0,
  });

  // 무한스크롤 handling함수
  const fetchNextPage = async () => {
    // 에러 없을때, 로딩중아닐때
    if (error || loading) {
      return;
    }
    const items = data[Object.keys(data)[0]].data;
    // console.log(data[Object.keys(data)[0]]);
    // 마지막페이지 아닐때, posts가 있을때, posts.length가 0이 아닐때
    if (isLastPage || !items || !items.length) {
      return;
    }
    // 캐시에 데이터가 있을때, pagelimit만 변경.
    const cachedLength = data[Object.keys(data)[0]].length;
    // console.log(cachedLength);
    if (cachedLength > itemLimit) {
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
      if (data[Object.keys(data)[0]].data?.length !== pageItemCount) {
        setIsLastPage(true);
      }
      setItemLimit((prev) => prev + pageItemCount);
    });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, data]);

  return (
    <>
      {children}
      <InViewWrapper ref={ref} />
    </>
  );
}

WrapperInfinityQueryScroll.defaultProps = {
  pageItemCount: 6,
};

export default WrapperInfinityQueryScroll;
