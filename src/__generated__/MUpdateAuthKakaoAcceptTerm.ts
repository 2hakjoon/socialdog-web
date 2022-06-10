/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAuthKakaoAcceptTermInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MUpdateAuthKakaoAcceptTerm
// ====================================================

export interface MUpdateAuthKakaoAcceptTerm_updateAuthKakaoAcceptTerm {
  __typename: "UpdateAuthKakaoAcceptTermOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MUpdateAuthKakaoAcceptTerm {
  updateAuthKakaoAcceptTerm: MUpdateAuthKakaoAcceptTerm_updateAuthKakaoAcceptTerm;
}

export interface MUpdateAuthKakaoAcceptTermVariables {
  args: UpdateAuthKakaoAcceptTermInputDto;
}
