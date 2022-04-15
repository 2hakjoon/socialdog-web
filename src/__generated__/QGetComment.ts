/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetComment
// ====================================================

export interface QGetComment_getComment_data_user {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface QGetComment_getComment_data {
  __typename: "Comments";
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: QGetComment_getComment_data_user;
  postId: string | null;
}

export interface QGetComment_getComment {
  __typename: "GetCommentOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetComment_getComment_data;
}

export interface QGetComment {
  getComment: QGetComment_getComment;
}

export interface QGetCommentVariables {
  args: GetCommentInputDto;
}
