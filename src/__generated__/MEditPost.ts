/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPostInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MEditPost
// ====================================================

export interface MEditPost_editPost {
  __typename: "EditPostOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MEditPost {
  editPost: MEditPost_editPost;
}

export interface MEditPostVariables {
  args: EditPostInputDto;
}
