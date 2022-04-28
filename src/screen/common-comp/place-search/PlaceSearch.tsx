import React, { Dispatch, SetStateAction, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { IPlaceSerchResult } from 'screen/post-write/PostWriteScreen';
import styled from 'styled-components';

const PlaceSearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  > :first-child {
    width: 100%;
  }
  > :nth-child(2) {
    width: 500px;
  }
  /* .css-1wy0on6 {
    display: none;
  } */
  * div {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .css-1wa3eu0-placeholder {
    display: none;
  }
`;

interface IPlaceSearch {
  searchResult: IPlaceSerchResult | null | undefined;
  setSearchResult: Dispatch<SetStateAction<any>> | null | undefined;
}

function PlaceSearch({ searchResult, setSearchResult }: IPlaceSearch) {
  useEffect(() => {});

  return (
    <PlaceSearchContainer>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        apiOptions={{ language: 'ko', region: 'ko' }}
        debounce={300}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['kr'],
          },
        }}
        selectProps={{
          searchResult,
          onChange: setSearchResult,
        }}
      />
    </PlaceSearchContainer>
  );
}
export default PlaceSearch;
