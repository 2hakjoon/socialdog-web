/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetMySubscribings
// ====================================================

export interface QGetMySubscribings_getMySubscribings_data {
  __typename: "UserProfile";
  photo: string | null;
  username: string | null;
  id: string;
  dogname: string | null;
}

export interface QGetMySubscribings_getMySubscribings {
  __typename: "GetMySubscribingsOutputDto";
  ok: boolean;
  data: QGetMySubscribings_getMySubscribings_data[];
}

export interface QGetMySubscribings {
  getMySubscribings: QGetMySubscribings_getMySubscribings;
}
