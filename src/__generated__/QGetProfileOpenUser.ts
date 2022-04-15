/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetProfileOpenUser
// ====================================================

export interface QGetProfileOpenUser_getProfileOpenUser_data {
  __typename: "UserProfile";
  id: string;
  username: string;
  dogname: string | null;
  photo: string | null;
}

export interface QGetProfileOpenUser_getProfileOpenUser {
  __typename: "GetProfileOpenUserOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetProfileOpenUser_getProfileOpenUser_data[];
}

export interface QGetProfileOpenUser {
  getProfileOpenUser: QGetProfileOpenUser_getProfileOpenUser;
}
