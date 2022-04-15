/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MDeleteComment
// ====================================================

export interface MDeleteComment_deleteComment {
  __typename: "DeleteCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MDeleteComment {
  deleteComment: MDeleteComment_deleteComment;
}

export interface MDeleteCommentVariables {
  args: DeleteCommentInputDto;
}
