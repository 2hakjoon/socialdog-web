/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QMe
// ====================================================

export interface QMe_me_data {
  __typename: "UserProfileAll";
  id: string;
  username: string | null;
  dogname: string | null;
  photo: string | null;
  profileOpen: boolean | null;
}

export interface QMe_me {
  __typename: "CoreUserOutputDto";
  data: QMe_me_data | null;
}

export interface QMe {
  me: QMe_me;
}
