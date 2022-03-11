import React from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 4px;
  width: 100%;
`;

interface IIntersectionObserver {
  viewState: (e: any) => void;
}

function IntersectionObserver({ viewState }: IIntersectionObserver) {
  const { ref, inView, entry } = useInView({
    // rootMargin: '-100px',
    threshold: 0,
  });

  useEffect(() => {
    viewState(inView);
  }, [inView]);

  return <Wrapper ref={ref} />;
}

export default IntersectionObserver;
