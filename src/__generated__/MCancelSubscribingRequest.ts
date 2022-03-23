/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CancelSubscribeRequestInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCancelSubscribingRequest
// ====================================================

export interface MCancelSubscribingRequest_cancelSubscribingRequest {
  __typename: "CancelSubscribeRequestOutputDto";
  error: string | null;
  ok: boolean;
}

export interface MCancelSubscribingRequest {
  cancelSubscribingRequest: MCancelSubscribingRequest_cancelSubscribingRequest;
}

export interface MCancelSubscribingRequestVariables {
  args: CancelSubscribeRequestInputDto;
}
