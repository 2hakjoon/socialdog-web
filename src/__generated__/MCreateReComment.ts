/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateReComment
// ====================================================

export interface MCreateReComment_createReComment {
  __typename: "CreateReCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateReComment {
  createReComment: MCreateReComment_createReComment;
}

export interface MCreateReCommentVariables {
  args: CreateReCommentInputDto;
}
