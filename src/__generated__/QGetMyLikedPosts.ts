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
  username: string | null;
  id: string;
}

export interface QGetMyLikedPosts_getMyLikedPosts_data {
  __typename: "PostAll";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  createdAt: string;
  user: QGetMyLikedPosts_getMyLikedPosts_data_user;
}

export interface QGetMyLikedPosts_getMyLikedPosts {
  __typename: "GetMyLikedPostsOutputDto";
  data: QGetMyLikedPosts_getMyLikedPosts_data[];
  ok: boolean;
  error: string | null;
}

export interface QGetMyLikedPosts {
  getMyLikedPosts: QGetMyLikedPosts_getMyLikedPosts;
}

export interface QGetMyLikedPostsVariables {
  page: CursorPaginationInputDto;
}
