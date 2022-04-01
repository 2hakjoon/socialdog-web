/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CursorPaginationInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetPostsByAddress
// ====================================================

export interface QGetPostsByAddress_getPostsByAddress_data_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
}

export interface QGetPostsByAddress_getPostsByAddress_data {
  __typename: "Posts";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
  user: QGetPostsByAddress_getPostsByAddress_data_user;
}

export interface QGetPostsByAddress_getPostsByAddress {
  __typename: "getPostsByAddressOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetPostsByAddress_getPostsByAddress_data[];
  length: number;
}

export interface QGetPostsByAddress {
  getPostsByAddress: QGetPostsByAddress_getPostsByAddress;
}

export interface QGetPostsByAddressVariables {
  address: string;
  page: CursorPaginationInputDto;
}
