import React, { useEffect, useState } from 'react';
import { IPlaceTerms } from 'types/GooglePlace';
import AddressSelector from '../components/AddressSelector';

// const mockupAddress = [
//   { offset: 0, value: '대한민국' },
//   { offset: 5, value: '광주광역시' },
//   { offset: 11, value: '광산구' },
//   { offset: 15, value: '삼도동' },
//   { offset: 19, value: '대산로' },
//   { offset: 23, value: '눈보뛰' },
// ];

function AddressPostsTemplate() {
  const [searchAddressTerms, setSearchAddressTerms] = useState<IPlaceTerms | null | undefined>();

  useEffect(() => {
    console.log(searchAddressTerms);
  }, [searchAddressTerms]);

  return <AddressSelector addressTerms={searchAddressTerms} setAddressTerms={setSearchAddressTerms} />;
}

export default AddressPostsTemplate;
