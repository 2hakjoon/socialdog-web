/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMyPostsInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetMyPosts
// ====================================================

export interface QGetMyPosts_getMyPosts_data {
  __typename: "PostAll";
  photos: string;
  id: string;
  likes: number | null;
}

export interface QGetMyPosts_getMyPosts {
  __typename: "GetMyPostsOutputDto";
  data: QGetMyPosts_getMyPosts_data[];
}

export interface QGetMyPosts {
  getMyPosts: QGetMyPosts_getMyPosts;
}

export interface QGetMyPostsVariables {
  args: GetMyPostsInputDto;
}
