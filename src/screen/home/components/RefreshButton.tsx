import useScroll from 'hooks/useScroll';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import TextBase from 'screen/common-comp/texts/TextBase';

const Wrapper = styled.button`
  position: fixed;
  top: 90px;
  z-index: 2;
  border: none;
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

interface RefreshButtonProps {
  onClick: () => void;
}

function RefreshButton({ onClick }: RefreshButtonProps) {
  const scrollState = useScroll();
  const [visible, setVisible] = useState(false);

  const refreshHandler = () => {
    setVisible(false);
    onClick();
  };

  useEffect(() => {
    if (scrollState === 'UP' && window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollState]);

  return (
    <>
      {visible && (
        <Wrapper onClick={refreshHandler} data-cy="btn-refresh-feed">
          <TextBase text={'새로운 게시물 확인'} />
        </Wrapper>
      )}
    </>
  );
}

export default RefreshButton;
