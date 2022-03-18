/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorePagination, GetPostsByAddressInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetPostsByAddress
// ====================================================

export interface QGetPostsByAddress_getPostsByAddress_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string | null;
  id: string;
}

export interface QGetPostsByAddress_getPostsByAddress_data {
  __typename: "PostAll";
  id: string;
  photos: string;
  placeId: string;
  address: string;
  contents: string;
  liked: boolean;
  user: QGetPostsByAddress_getPostsByAddress_data_user;
}

export interface QGetPostsByAddress_getPostsByAddress {
  __typename: "GetSubscribingPostsOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetPostsByAddress_getPostsByAddress_data[];
}

export interface QGetPostsByAddress {
  getPostsByAddress: QGetPostsByAddress_getPostsByAddress;
}

export interface QGetPostsByAddressVariables {
  page: CorePagination;
  args: GetPostsByAddressInputDto;
}