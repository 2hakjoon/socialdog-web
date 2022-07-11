import useScroll from 'hooks/useScroll';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  padding: 4px 8px;
`;

function ButtonRefresh() {
  const scrollState = useScroll();
  // console.log(scrollState)

  

  return <Wrapper>
    새로고침
  </Wrapper>;
}

export default ButtonRefresh;
