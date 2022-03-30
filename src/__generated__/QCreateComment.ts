/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: QCreateComment
// ====================================================

export interface QCreateComment_createComment {
  __typename: "CreateCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface QCreateComment {
  createComment: QCreateComment_createComment;
}

export interface QCreateCommentVariables {
  args: CreateCommentInputDto;
}
