import React, { Dispatch, SetStateAction } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { IPlaceSerchResult, IPlaceTerms } from 'types/GooglePlace';

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

interface IAddressSelector {
  address: IPlaceTerms | undefined | null;
  setAddress: Dispatch<SetStateAction<IPlaceTerms | null | undefined>>;
}

function AddressSelector({ address, setAddress }: IAddressSelector) {
  const handleResultToTerm = (data: IPlaceSerchResult) => {
    console.log(data.value.terms);
    setAddress(data.value.terms);
  };
  return (
    <WrapperRow>
      {address ? (
        <>{'asdfsadf'}</>
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
                address,
                onChange: handleResultToTerm,
              }}
            />
            <button type="button">취소</button>
          </PlaceSearchContainer>
        </>
      )}
    </WrapperRow>
  );
}

export default AddressSelector;
