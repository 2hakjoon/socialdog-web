import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ImageRound from './ImageRound';

interface IProfileImage {
  url: string | null;
  size:
    | '12px'
    | '14px'
    | '16px'
    | '20px'
    | '24px'
    | '32px'
    | '48px'
    | '64px'
    | '80px'
    | '96px'
    | '112px'
    | '128px'
    | '146px'
    | '160px';
}

function ProfilePhoto({ url, size }: IProfileImage) {
  const iconSizeMapper = (pixelSize: string): SizeProp => {
    switch (pixelSize) {
      case '12px':
        return 'xs';

      case '14px':
        return 'sm';

      case '16px':
        return '1x';

      case '20px':
        return 'lg';

      case '32px':
        return '2x';

      case '48px':
        return '3x';

      case '64px':
        return '4x';

      case '80px':
        return '5x';

      case '96px':
        return '6x';

      case '112px':
        return '7x';

      case '128px':
        return '8x';

      case '146px':
        return '9x';

      case '160px':
        return '10x';

      default:
        return '1x';
    }
  };
  return (
    <>
      {url ? <ImageRound url={url} size={size} /> : <FontAwesomeIcon icon={faCircleUser} size={iconSizeMapper(size)} />}
    </>
  );
}
export default ProfilePhoto;
