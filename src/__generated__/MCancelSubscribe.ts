/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CancelSubscribeInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCancelSubscribe
// ====================================================

export interface MCancelSubscribe_cancelSubscribe {
  __typename: "CancelSubscribeOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCancelSubscribe {
  cancelSubscribe: MCancelSubscribe_cancelSubscribe;
}

export interface MCancelSubscribeVariables {
  args: CancelSubscribeInputDto;
}
