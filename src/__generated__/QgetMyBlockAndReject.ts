/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QgetMyBlockAndReject
// ====================================================

export interface QgetMyBlockAndReject_getMyRejectRequests_data {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  photo: string | null;
  dogname: string | null;
}

export interface QgetMyBlockAndReject_getMyRejectRequests {
  __typename: "GetMyRejectRequestsOutputDto";
  ok: boolean;
  data: QgetMyBlockAndReject_getMyRejectRequests_data[];
  error: string | null;
}

export interface QgetMyBlockAndReject_getMyBlockingUsers_data {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  photo: string | null;
  dogname: string | null;
}

export interface QgetMyBlockAndReject_getMyBlockingUsers {
  __typename: "GetBlockingUsersOutputDto";
  ok: boolean;
  error: string | null;
  data: QgetMyBlockAndReject_getMyBlockingUsers_data[];
}

export interface QgetMyBlockAndReject {
  getMyRejectRequests: QgetMyBlockAndReject_getMyRejectRequests;
  getMyBlockingUsers: QgetMyBlockAndReject_getMyBlockingUsers;
}
