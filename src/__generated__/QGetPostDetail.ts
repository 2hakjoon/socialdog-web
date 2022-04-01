/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPostDetailInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetPostDetail
// ====================================================

export interface QGetPostDetail_getPostDetail_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QGetPostDetail_getPostDetail_data {
  __typename: "Posts";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
  user: QGetPostDetail_getPostDetail_data_user;
}

export interface QGetPostDetail_getPostDetail {
  __typename: "GetPostDetailOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetPostDetail_getPostDetail_data;
}

export interface QGetPostDetail {
  getPostDetail: QGetPostDetail_getPostDetail;
}

export interface QGetPostDetailVariables {
  args: GetPostDetailInputDto;
}
