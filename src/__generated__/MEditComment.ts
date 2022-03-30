/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MEditComment
// ====================================================

export interface MEditComment_editComment {
  __typename: "EditCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MEditComment {
  editComment: MEditComment_editComment;
}

export interface MEditCommentVariables {
  args: EditCommentInputDto;
}
