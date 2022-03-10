/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserInputDto, BlockState, SubscribeRequestState } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetUserProfile
// ====================================================

export interface QGetUserProfile_getUserProfile_data {
  __typename: "UserProfileAll";
  id: string;
  username: string | null;
  dogname: string | null;
  photo: string | null;
  subscribings: number;
  subscribers: number;
}

export interface QGetUserProfile_getUserProfile {
  __typename: "GetUserOutputDto";
  ok: boolean;
  error: string | null;
  data: QGetUserProfile_getUserProfile_data | null;
  blocking: BlockState | null;
  profileOpened: boolean | null;
  subscribeRequested: SubscribeRequestState | null;
}

export interface QGetUserProfile {
  getUserProfile: QGetUserProfile_getUserProfile;
}

export interface QGetUserProfileVariables {
  args: GetUserInputDto;
}
