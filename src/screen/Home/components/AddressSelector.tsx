import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'assets/styles/theme';
import React, { Dispatch, SetStateAction } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { IPlaceSerchResult, IPlaceTerms } from 'types/GooglePlace';
import { useState } from 'react';

const PlaceSearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > :first-child {
    flex-shrink: 0;
  }
  > :last-child {
    flex-shrink: 0;
  }
  > :nth-child(2) {
    margin: 0 8px;
    width: 80%;
  }
  .css-1wy0on6 {
    display: none;
  }
`;

const TermWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
`;

const TermBlock = styled.div<ITermBlock>`
  padding: 8px 10px;
  margin: 4px;
  border-radius: 20px;
  background-color: ${(p) => p.backgroundColor};
`;

interface ITermBlock {
  backgroundColor: string;
}

interface IAddressSelector {
  addressTerms: IPlaceTerms | undefined | null;
  setAddressTerms: Dispatch<SetStateAction<IPlaceTerms | null | undefined>>;
}

function AddressSelector({ addressTerms, setAddressTerms }: IAddressSelector) {
  const [searchEnable, setSearchEnable] = useState(false);

  const handleResultToTerm = (data: IPlaceSerchResult) => {
    console.log(data.value.terms);
    setAddressTerms(data.value.terms.reverse());
  };

  const removeLastTerm = () => {
    if (!addressTerms) {
      return;
    }
    setAddressTerms([...addressTerms.slice(0, -1)]);
  };

  const isLastAddressBlock = (idx: number) => {
    if (addressTerms) {
      return idx === addressTerms.length - 1;
    }
  };

  return (
    <WrapperRow bc={'white'} w="100%" p="0 8px">
      {addressTerms && !searchEnable ? (
        <WrapperRow bc={'white'} w="100%" jc="space-between">
          <TermWrapper>
            {addressTerms.map((term, idx) => (
              <TermBlock
                key={term.offset}
                backgroundColor={
                  isLastAddressBlock(idx) ? theme.color.blue.primaryBlue : theme.color.achromatic.lightGray
                }
              >
                <WrapperRow onClick={isLastAddressBlock(idx) ? removeLastTerm : () => {}}>
                  <TextBase
                    text={term.value}
                    color={isLastAddressBlock(idx) ? theme.color.achromatic.primaryWhite : theme.color.achromatic.black}
                  />
                  {isLastAddressBlock(idx) && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      color={theme.color.achromatic.primaryWhite}
                      style={{ margin: '0px 0px 0px 6px' }}
                    />
                  )}
                </WrapperRow>
              </TermBlock>
            ))}
          </TermWrapper>
          <WrapperRow p="10px" h="100%">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" onClick={() => setSearchEnable(true)} />
          </WrapperRow>
        </WrapperRow>
      ) : (
        <>
          <PlaceSearchContainer>
            <TextBase text="검색" />
            <GooglePlacesAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              apiOptions={{ language: 'ko', region: 'ko' }}
              debounce={500}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['kr'],
                },
              }}
              selectProps={{
                addressTerms,
                onChange: handleResultToTerm,
              }}
            />
            <button type="button" onClick={() => setSearchEnable(false)}>
              취소
            </button>
          </PlaceSearchContainer>
        </>
      )}
    </WrapperRow>
  );
}

export default AddressSelector;
