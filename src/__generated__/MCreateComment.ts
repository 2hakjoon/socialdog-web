/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateComment
// ====================================================

export interface MCreateComment_createComment {
  __typename: "CreateCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateComment {
  createComment: MCreateComment_createComment;
}

export interface MCreateCommentVariables {
  args: CreateCommentInputDto;
}
