/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetMyBlockAndReject
// ====================================================

export interface QGetMyBlockAndReject_getMyRejectRequests_data {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface QGetMyBlockAndReject_getMyRejectRequests {
  __typename: "GetMyRejectRequestsOutputDto";
  ok: boolean;
  data: QGetMyBlockAndReject_getMyRejectRequests_data[];
  error: string | null;
}

export interface QGetMyBlockAndReject_getMyBlockingUsers_data {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface QGetMyBlockAndReject_getMyBlockingUsers {
  __typename: "GetBlockingUsersOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetMyBlockAndReject_getMyBlockingUsers_data[];
}

export interface QGetMyBlockAndReject {
  getMyRejectRequests: QGetMyBlockAndReject_getMyRejectRequests;
  getMyBlockingUsers: QGetMyBlockAndReject_getMyBlockingUsers;
}
