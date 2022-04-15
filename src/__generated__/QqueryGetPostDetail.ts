/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPostDetailInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QqueryGetPostDetail
// ====================================================

export interface QqueryGetPostDetail_getPostDetail_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QqueryGetPostDetail_getPostDetail_data {
  __typename: "PostAll";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  createdAt: string;
  user: QqueryGetPostDetail_getPostDetail_data_user;
}

export interface QqueryGetPostDetail_getPostDetail {
  __typename: "GetPostDetailOutputDto";
  ok: boolean;
  error: string | null;
  data: QqueryGetPostDetail_getPostDetail_data;
}

export interface QqueryGetPostDetail {
  getPostDetail: QqueryGetPostDetail_getPostDetail;
}

export interface QqueryGetPostDetailVariables {
  args: GetPostDetailInputDto;
}
