/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResponseSubscribeInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MResponseSubscribe
// ====================================================

export interface MResponseSubscribe_responseSubscribe {
  __typename: "ResponseSubscribeOutputDto";
  error: string | null;
  ok: boolean;
}

export interface MResponseSubscribe {
  responseSubscribe: MResponseSubscribe_responseSubscribe;
}

export interface MResponseSubscribeVariables {
  args: ResponseSubscribeInputDto;
}
