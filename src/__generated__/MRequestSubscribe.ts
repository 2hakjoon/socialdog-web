/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestSubscribeInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MRequestSubscribe
// ====================================================

export interface MRequestSubscribe_requestSubscribe {
  __typename: "RequestSubscribeOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MRequestSubscribe {
  requestSubscribe: MRequestSubscribe_requestSubscribe;
}

export interface MRequestSubscribeVariables {
  args: RequestSubscribeInputDto;
}
