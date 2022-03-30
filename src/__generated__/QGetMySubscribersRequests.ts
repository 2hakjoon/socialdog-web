/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetMySubscribersRequests
// ====================================================

export interface QGetMySubscribersRequests_getMySubscribers_data {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
  dogname: string | null;
}

export interface QGetMySubscribersRequests_getMySubscribers {
  __typename: "GetMySubscribersOutputDto";
  ok: boolean;
  data: QGetMySubscribersRequests_getMySubscribers_data[];
}

export interface QGetMySubscribersRequests_getSubscribeRequests_data {
  __typename: "UserProfile";
  updatedAt: string;
  id: string;
  username: string;
  dogname: string | null;
  photo: string | null;
}

export interface QGetMySubscribersRequests_getSubscribeRequests {
  __typename: "GetSubscribeRequestsOutputDto";
  data: QGetMySubscribersRequests_getSubscribeRequests_data[];
}

export interface QGetMySubscribersRequests {
  getMySubscribers: QGetMySubscribersRequests_getMySubscribers;
  getSubscribeRequests: QGetMySubscribersRequests_getSubscribeRequests;
}
