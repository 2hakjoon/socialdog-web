/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QMeAll
// ====================================================

export interface QMeAll_me_data {
  __typename: "UserProfileAll";
  id: string;
  username: string | null;
}

export interface QMeAll_me {
  __typename: "CoreUserOutputDto";
  data: QMeAll_me_data | null;
}

export interface QMeAll {
  me: QMeAll_me;
}
