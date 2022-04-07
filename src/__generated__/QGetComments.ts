/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto, GetCommentsInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetComments
// ====================================================

export interface QGetComments_getComments_data_user {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface QGetComments_getComments_data {
  __typename: "Comments";
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  reCommentCounts: number | null;
  user: QGetComments_getComments_data_user;
}

export interface QGetComments_getComments {
  __typename: "GetCommentsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetComments_getComments_data[];
}

export interface QGetComments {
  getComments: QGetComments_getComments;
}

export interface QGetCommentsVariables {
  page: CursorPaginationInputDto;
  args: GetCommentsInputDto;
}
