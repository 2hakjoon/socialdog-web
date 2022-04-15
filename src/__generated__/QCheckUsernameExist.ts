/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckUsernameExistInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QCheckUsernameExist
// ====================================================

export interface QCheckUsernameExist_checkUsernameExist {
  __typename: "CheckUsernameExistOutputDto";
  ok: boolean;
  error: string | null;
  isExist: boolean;
}

export interface QCheckUsernameExist {
  checkUsernameExist: QCheckUsernameExist_checkUsernameExist;
}

export interface QCheckUsernameExistVariables {
  args: CheckUsernameExistInputDto;
}
