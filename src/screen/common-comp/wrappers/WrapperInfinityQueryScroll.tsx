import { QueryResult } from '@apollo/client';
import useScroll from 'hooks/useScroll';
import React, { Dispatch, ReactNode, SetStateAction, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { CursorArgs } from '__generated__/globalTypes';
import TextBase from '../texts/TextBase';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const InViewWrapper = styled.div`
  height: 4px;
  width: 100%;
`;

interface IRefreshBtnWrapper {
  display: 'block' | 'none';
}

const RefreshBtnWrapper = styled.button<IRefreshBtnWrapper>`
  position: fixed;
  top: 90px;
  z-index: 2;
  border: none;
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.3);
  display: ${(p) => p.display};
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
  const scrollState = useScroll();

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

  const willdisplayRefreshButton = () => {
    console.log(window.scrollY)
    if (scrollState === 'UP' && window.scrollY > 300) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, data]);

  return (
    <Wrapper>
      <RefreshBtnWrapper display={willdisplayRefreshButton() ? 'block' : 'none'}>
        <TextBase text={'새로운 게시물 확인'} />
      </RefreshBtnWrapper>
      {children}
      <InViewWrapper ref={ref} />
    </Wrapper>
  );
}

WrapperInfinityQueryScroll.defaultProps = {
  pageItemCount: 6,
};

export default WrapperInfinityQueryScroll;
