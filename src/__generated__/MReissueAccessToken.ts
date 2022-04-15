/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReissueAccessTokenInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MReissueAccessToken
// ====================================================

export interface MReissueAccessToken_reissueAccessToken {
  __typename: "ReissueAccessTokenOutputDto";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  isRefreshTokenExpired: boolean | null;
}

export interface MReissueAccessToken {
  reissueAccessToken: MReissueAccessToken_reissueAccessToken;
}

export interface MReissueAccessTokenVariables {
  args: ReissueAccessTokenInputDto;
}
