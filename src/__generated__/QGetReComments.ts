/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto, GetReCommentsInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetReComments
// ====================================================

export interface QGetReComments_getReComments_data_user {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface QGetReComments_getReComments_data {
  __typename: "Comments";
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  reCommentCounts: number;
  user: QGetReComments_getReComments_data_user;
}

export interface QGetReComments_getReComments {
  __typename: "GetReCommentsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetReComments_getReComments_data[];
}

export interface QGetReComments {
  getReComments: QGetReComments_getReComments;
}

export interface QGetReCommentsVariables {
  page: CursorPaginationInputDto;
  args: GetReCommentsInputDto;
}
