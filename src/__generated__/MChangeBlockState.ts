/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeBlockStateInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MChangeBlockState
// ====================================================

export interface MChangeBlockState_changeBlockState {
  __typename: "ChangeBlockStateOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MChangeBlockState {
  changeBlockState: MChangeBlockState_changeBlockState;
}

export interface MChangeBlockStateVariables {
  args: ChangeBlockStateInputDto;
}
