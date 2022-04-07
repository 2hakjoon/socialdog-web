/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetMyLikedPosts
// ====================================================

export interface QGetMyLikedPosts_getMyLikedPosts_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QGetMyLikedPosts_getMyLikedPosts_data {
  __typename: "Posts";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  commentCounts: number;
  createdAt: string;
  updatedAt: string;
  user: QGetMyLikedPosts_getMyLikedPosts_data_user;
}

export interface QGetMyLikedPosts_getMyLikedPosts {
  __typename: "GetMyLikedPostsOutputDto";
  data: QGetMyLikedPosts_getMyLikedPosts_data[];
  length: number;
  ok: boolean;
  error: string | null;
}

export interface QGetMyLikedPosts {
  getMyLikedPosts: QGetMyLikedPosts_getMyLikedPosts;
}

export interface QGetMyLikedPostsVariables {
  page: CursorPaginationInputDto;
}
