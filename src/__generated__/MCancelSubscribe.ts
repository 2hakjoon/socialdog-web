/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CancelSubscribingInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: McancelSubscribing
// ====================================================

export interface McancelSubscribing_cancelSubscribing {
  __typename: "cancelSubscribingOutputDto";
  ok: boolean;
  error: string | null;
}

export interface McancelSubscribing {
  cancelSubscribing: McancelSubscribing_cancelSubscribing;
}

export interface McancelSubscribingVariables {
  args: CancelSubscribingInputDto;
}
