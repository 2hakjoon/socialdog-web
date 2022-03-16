import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 4px;
  width: 100%;
`;

interface IWrapperInfinityScroll {
  children: ReactNode;
  fetchHandler: () => void;
  enableFetch: boolean;
}

function WrapperInfinityScroll({ children, fetchHandler, enableFetch }: IWrapperInfinityScroll) {
  const { ref, inView, entry } = useInView({
    // rootMargin: '-100px',
    threshold: 0,
  });

  useEffect(() => {
    // console.log('infinity', enableFetch);
    if (enableFetch && inView) {
      fetchHandler();
    }
  }, [inView, enableFetch]);

  return (
    <>
      {children}
      <Wrapper ref={ref} />
    </>
  );
}

export default WrapperInfinityScroll;
