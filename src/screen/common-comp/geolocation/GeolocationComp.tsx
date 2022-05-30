import { geolocationState } from 'apollo-setup';
import React, { useEffect } from 'react';
import { getStoredGeolocation } from 'utils/local-storage';

function GeolocationComp() {
  const { userAgent } = window.navigator;
  // console.log(userAgent);

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
      };
      const error = (err: any) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      getStoredGeolocation().then((geolocation) => geolocationState(geolocation));
    }
  }, []);
}

export default GeolocationComp;
