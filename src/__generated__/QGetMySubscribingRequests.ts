/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QGetMySubscribingRequests
// ====================================================

export interface QGetMySubscribingRequests_getSubscribingRequests_data {
  __typename: "UserProfile";
  updatedAt: string;
  id: string;
  username: string | null;
  dogname: string | null;
  photo: string | null;
}

export interface QGetMySubscribingRequests_getSubscribingRequests {
  __typename: "GetSubscribingRequestsOutputDto";
  data: QGetMySubscribingRequests_getSubscribingRequests_data[];
}

export interface QGetMySubscribingRequests {
  getSubscribingRequests: QGetMySubscribingRequests_getSubscribingRequests;
}
