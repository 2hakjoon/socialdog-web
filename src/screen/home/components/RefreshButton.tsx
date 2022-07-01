import useScroll from 'hooks/useScroll';
import styled from 'styled-components';
import React from 'react';
import TextBase from 'screen/common-comp/texts/TextBase';

interface IRefreshBtnWrapper {
  display: 'block' | 'none';
}

const Wrapper = styled.button<IRefreshBtnWrapper>`
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
  cursor: pointer;
`;

interface RefreshButtonProps {
  onClick: () => void;
}

function RefreshButton({ onClick }: RefreshButtonProps) {
  const scrollState = useScroll();
  const willdisplayRefreshButton = () => {
    if (scrollState === 'UP' && window.scrollY > 300) {
      return true;
    }
    return false;
  };
  return (
    <Wrapper onClick={onClick} display={willdisplayRefreshButton() ? 'block' : 'none'}>
      <TextBase text={'새로운 게시물 확인'} />
    </Wrapper>
  );
}

export default RefreshButton;
