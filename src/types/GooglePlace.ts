export interface IPlaceSerchResult {
  label: string;
  value: {
    place_id: string;
    description: string;
    terms: {
      offset: number;
      value: string;
    }[]
  };
}

export interface IPlaceTerm{
  offset: number;
  value: string;
}

export interface IGeolocation{
  latitude: number;
  longitude: number;
}

export type IPlaceTerms = Array<IPlaceTerm>