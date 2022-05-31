import { addressTermState, geolocationState } from 'apollo-setup';
import React, { useEffect } from 'react';
import { IGeolocation, IPlaceTerms } from 'types/GooglePlace';
import { getStoredAddressTerms, getStoredGeolocation, storeGelocation } from 'utils/local-storage';

function GeolocationComp() {
  const { userAgent } = window.navigator;
  // console.log(userAgent);

  // gelocation정보 업데이트
  useEffect(() => {
    if (userAgent !== 'SOCIALDOG_APP') {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      };
      const success = (pos: any) => {
        const crd = pos.coords;
        geolocationState({ latitude: crd.latitude, longitude: crd.longitude });
        storeGelocation({ latitude: crd.latitude, longitude: crd.longitude });
      };
      const error = (err: any) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      getStoredGeolocation().then((geolocation: IGeolocation | null) => {
        if (geolocation?.latitude && geolocation.longitude) {
          geolocationState({ latitude: geolocation.latitude, longitude: geolocation.longitude });
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
      });
    } else {
      getStoredGeolocation().then((geolocation: IGeolocation | null) => {
        if (geolocation) {
          geolocationState(geolocation);
        }
      });
    }
  }, []);

  // addressSearch 페이지에서 쓸 termState 초기화
  useEffect(() => {
    getStoredAddressTerms().then((addressTerm: IPlaceTerms | null) => {
      addressTermState(addressTerm);
    });
  }, []);

  return <></>;
}

export default GeolocationComp;
