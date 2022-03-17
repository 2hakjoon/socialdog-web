import React, { Dispatch, SetStateAction } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { IPlaceSerchResult } from 'types/GooglePlace';

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
  address: object | undefined | null;
  setAddress: Dispatch<SetStateAction<IPlaceSerchResult | null | undefined>>;
}

function AddressSelector({ address, setAddress }: IAddressSelector) {
  return (
    <WrapperRow>
      {false ? (
        <>{address}</>
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
                onChange: setAddress,
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
