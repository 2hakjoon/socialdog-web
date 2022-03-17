export interface IPlaceSerchResult {
  label: string;
  value: {
    place_id: string;
    description: string;
  };
  terms: {
    offset: number;
    value: string;
  };
}