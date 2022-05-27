/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindUserByUsernameInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QFindUserByUsername
// ====================================================

export interface QFindUserByUsername_findUsersByUsername_data {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QFindUserByUsername_findUsersByUsername {
  __typename: "FindUserByUsernameOutputDto";
  data: QFindUserByUsername_findUsersByUsername_data[] | null;
  ok: boolean;
  error: string | null;
}

export interface QFindUserByUsername {
  findUsersByUsername: QFindUserByUsername_findUsersByUsername;
}

export interface QFindUserByUsernameVariables {
  args: FindUserByUsernameInputDto;
}
