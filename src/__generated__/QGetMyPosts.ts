/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetMyPosts
// ====================================================

export interface QGetMyPosts_getMyPosts_data {
  __typename: "Posts";
  createdAt: string;
  photos: string;
  id: string;
  likes: number;
}

export interface QGetMyPosts_getMyPosts {
  __typename: "GetMyPostsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetMyPosts_getMyPosts_data[];
  length: number;
}

export interface QGetMyPosts {
  getMyPosts: QGetMyPosts_getMyPosts;
}

export interface QGetMyPostsVariables {
  args: CursorPaginationInputDto;
}
