/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetSubscribingPosts
// ====================================================

export interface QGetSubscribingPosts_getSubscribingPosts_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QGetSubscribingPosts_getSubscribingPosts_data {
  __typename: "Posts";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  commentCounts: number | null;
  createdAt: string;
  updatedAt: string;
  user: QGetSubscribingPosts_getSubscribingPosts_data_user;
}

export interface QGetSubscribingPosts_getSubscribingPosts {
  __typename: "GetSubscribingPostsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetSubscribingPosts_getSubscribingPosts_data[];
  length: number;
}

export interface QGetSubscribingPosts {
  getSubscribingPosts: QGetSubscribingPosts_getSubscribingPosts;
}

export interface QGetSubscribingPostsVariables {
  page: CursorPaginationInputDto;
}
