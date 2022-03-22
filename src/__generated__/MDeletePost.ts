/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePostInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MDeletePost
// ====================================================

export interface MDeletePost_deletePost {
  __typename: "DeletePostOutputDto";
  error: string | null;
  ok: boolean;
}

export interface MDeletePost {
  deletePost: MDeletePost_deletePost;
}

export interface MDeletePostVariables {
  args: DeletePostInputDto;
}
