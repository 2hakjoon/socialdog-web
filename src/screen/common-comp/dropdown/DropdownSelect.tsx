import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';
import WrapperColumn from '../wrappers/WrapperColumn';
import WrapperRow from '../wrappers/WrapperRow';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 4px 12px;
  border-radius: 10px;
`;

interface InnerWrpperProps {
  offset: number;
}

const InnerWrapper = styled.div<InnerWrpperProps>`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  right: 0px;
  bottom: -${(p) => p.offset + 8}px;
  z-index: 1;
`;

interface IDropdownSelect {
  options: string[];
  selectOption: number | null;
  setSelectOption: Dispatch<SetStateAction<number | null>>;
}

function DropdownSelect({ options, selectOption, setSelectOption }: IDropdownSelect) {
  const [dropdownVisible, setdropdownVisible] = useState(false);

  const tabHeight = 40;

  const toggleDropdownVisible = () => {
    setdropdownVisible((prev) => !prev);
  };

  const hideDropdownAfterOnClick = (option: number) => {
    setSelectOption(option);
    setdropdownVisible(false);
  };

  useEffect(() => {
    return () => setdropdownVisible(false);
  }, []);

  return (
    <Wrapper>
      <WrapperRow bc="none" onClick={toggleDropdownVisible} jc="space-between" w={'100%'} h={'30px'}>
        <TextBase text={selectOption !== null ? options[selectOption] : '신고 유형을 선택해주세요.'} />
        <FontAwesomeIcon size="lg" icon={faCircleChevronDown} />
      </WrapperRow>
      {dropdownVisible && (
        <InnerWrapper offset={options.length * tabHeight}>
          {options.map((option, idx) => (
            <WrapperRow
              key={option}
              w="100%"
              h={`${tabHeight}px`}
              jc="flex-start"
              p="0px 10px"
              onClick={() => hideDropdownAfterOnClick(idx)}
            >
              <TextBase text={option} />
            </WrapperRow>
          ))}
        </InnerWrapper>
      )}
    </Wrapper>
  );
}

export default DropdownSelect;
