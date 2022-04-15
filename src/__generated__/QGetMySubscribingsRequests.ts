/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetMySubscribingsRequests
// ====================================================

export interface QGetMySubscribingsRequests_getMySubscribings_data {
  __typename: "UserProfile";
  photo: string | null;
  username: string;
  id: string;
  dogname: string | null;
}

export interface QGetMySubscribingsRequests_getMySubscribings {
  __typename: "GetMySubscribingsOutputDto";
  ok: boolean;
  data: QGetMySubscribingsRequests_getMySubscribings_data[];
}

export interface QGetMySubscribingsRequests_getSubscribingRequests_data {
  __typename: "UserProfile";
  updatedAt: string;
  id: string;
  username: string;
  dogname: string | null;
  photo: string | null;
}

export interface QGetMySubscribingsRequests_getSubscribingRequests {
  __typename: "GetSubscribingRequestsOutputDto";
  data: QGetMySubscribingsRequests_getSubscribingRequests_data[];
}

export interface QGetMySubscribingsRequests {
  getMySubscribings: QGetMySubscribingsRequests_getMySubscribings;
  getSubscribingRequests: QGetMySubscribingsRequests_getSubscribingRequests;
}
