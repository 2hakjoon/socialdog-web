/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeBlockStateInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ChangeBlockState
// ====================================================

export interface ChangeBlockState_changeBlockState {
  __typename: "ChangeBlockStateOutputDto";
  ok: boolean;
  error: string | null;
}

export interface ChangeBlockState {
  changeBlockState: ChangeBlockState_changeBlockState;
}

export interface ChangeBlockStateVariables {
  args: ChangeBlockStateInputDto;
}
