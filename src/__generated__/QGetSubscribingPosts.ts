/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetSubscribingPosts
// ====================================================

export interface QGetSubscribingPosts_getSubscribingPosts_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string | null;
  id: string;
}

export interface QGetSubscribingPosts_getSubscribingPosts_data {
  __typename: "PostAll";
  id: string;
  photos: string;
  placeId: string;
  address: string;
  contents: string;
  likes: number;
  liked: boolean;
  user: QGetSubscribingPosts_getSubscribingPosts_data_user;
}

export interface QGetSubscribingPosts_getSubscribingPosts {
  __typename: "GetSubscribingPostsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetSubscribingPosts_getSubscribingPosts_data[];
}

export interface QGetSubscribingPosts {
  getSubscribingPosts: QGetSubscribingPosts_getSubscribingPosts;
}
