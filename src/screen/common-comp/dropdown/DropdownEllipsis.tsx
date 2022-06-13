import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from 'assets/styles/theme';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';
import WrapperColumn from '../wrappers/WrapperColumn';
import WrapperRow from '../wrappers/WrapperRow';

const Wrapper = styled.div`
  position: relative;
  width: 40px;
  height: 100%;
  cursor: pointer;
  border-radius: 40px;
`;

interface InnerWrpperProps {
  offset: number;
}

const InnerWrapper = styled.div<InnerWrpperProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  right: 0px;
  bottom: -${(p) => p.offset + 1}px;
  z-index: 1;
  -webkit-box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.37);
  box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.37);
`;

interface IDropdownEllipsis {
  items: [{ itemName: string; onClick: () => void }];
}

function DropdownEllipsis({ items }: IDropdownEllipsis) {
  const [dropdownVisible, setdropdownVisible] = useState(false);

  const tabHeight = 40;

  const toggleDropdownVisible = () => {
    setdropdownVisible((prev) => !prev);
  };

  const hideDropdownAfterOnClick = (onClick: () => void) => {
    onClick();
    setdropdownVisible(false);
  };

  useEffect(() => {
    return () => setdropdownVisible(false);
  }, []);

  return (
    <Wrapper>
      <WrapperColumn bc="none" onClick={toggleDropdownVisible} jc="center" w={'100%'} h={'100%'}>
        <FontAwesomeIcon size="lg" icon={faEllipsisVertical} color={theme.color.achromatic.darkGray} />
      </WrapperColumn>
      {dropdownVisible && (
        <InnerWrapper offset={items.length * tabHeight}>
          {items.map(({ itemName, onClick }) => (
            <WrapperRow
              key={itemName}
              w="150px"
              h={`${tabHeight}px`}
              jc="center"
              onClick={() => hideDropdownAfterOnClick(onClick)}
            >
              <TextBase text={itemName} fontWeight={500} />
            </WrapperRow>
          ))}
        </InnerWrapper>
      )}
    </Wrapper>
  );
}

export default DropdownEllipsis;
