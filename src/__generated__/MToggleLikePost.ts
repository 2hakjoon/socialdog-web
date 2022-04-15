/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleLikePostInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MToggleLikePost
// ====================================================

export interface MToggleLikePost_toggleLikePost {
  __typename: "ToggleLikePostOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MToggleLikePost {
  toggleLikePost: MToggleLikePost_toggleLikePost;
}

export interface MToggleLikePostVariables {
  args: ToggleLikePostInputDto;
}
