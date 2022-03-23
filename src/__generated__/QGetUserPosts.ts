/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetUserPosts
// ====================================================

export interface QGetUserPosts_getUserPosts_data {
  __typename: "PostAll";
  createdAt: string;
  photos: string;
  id: string;
}

export interface QGetUserPosts_getUserPosts {
  __typename: "GetUserPostsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetUserPosts_getUserPosts_data[];
  length: number;
}

export interface QGetUserPosts {
  getUserPosts: QGetUserPosts_getUserPosts;
}

export interface QGetUserPostsVariables {
  username: string;
  page: CursorPaginationInputDto;
}
