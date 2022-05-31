import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from 'assets/styles/theme';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { IPlaceSerchResult, IPlaceTerms } from 'types/GooglePlace';
import PlaceSearch from 'screen/common-comp/place-search/PlaceSearch';
import axios from 'axios';
import { addressTermState, geolocationState } from 'apollo-setup';
import { useReactiveVar } from '@apollo/client';
import { storeAddressTerms } from 'utils/local-storage';

const PlaceSearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 14px;
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
  const geolocation = useReactiveVar(geolocationState);

  const modifyAllTerms = (data: IPlaceTerms) => {
    setAddressTerms(data);
    storeAddressTerms(data);
    addressTermState(data);
  };

  const handleResultToTerm = (data: IPlaceSerchResult) => {
    const termObj = data.value.terms.reverse();
    modifyAllTerms(termObj);
    setSearchEnable(false);
  };

  const removeLastTerm = () => {
    if (!addressTerms) {
      return;
    }
    if (addressTerms.length <= 1) {
      setSearchEnable(true);
      return;
    }
    const removedArray = addressTerms.slice(0, -1);
    setAddressTerms(removedArray);
    modifyAllTerms(removedArray);
  };

  const isLastAddressBlock = (idx: number) => {
    if (addressTerms) {
      return idx === addressTerms.length - 1;
    }
  };

  const getAddressFromLatLng = async () => {
    if (!geolocation) {
      return;
    }
    const response = await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation.latitude},${geolocation.longitude}&language=ko&key=${process.env.REACT_APP_GOOGLE_API_KEY_2}`,
    );
    console.log(response);
    const address = response.data.plus_code.compound_code.split(' ').splice(1);
    const termObj: IPlaceTerms = [];
    let offset = 0;
    for (let i = 0; i < address.length; i++) {
      termObj.push({ offset, value: address[i] });
      offset += address[i].length + 1;
    }
    modifyAllTerms(termObj);
  };

  useEffect(() => {
    if (geolocation && !addressTermState()) {
      getAddressFromLatLng();
    }
  }, [geolocation]);

  return (
    <WrapperRow bc={'white'} w="100%" p="0px 8px">
      {addressTerms && !searchEnable ? (
        <WrapperRow bc={'white'} w="100%" jc="space-between" p="8px 0px">
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
            <PlaceSearch searchResult={null} setSearchResult={handleResultToTerm} />
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
