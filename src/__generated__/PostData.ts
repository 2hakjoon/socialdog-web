/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostData
// ====================================================

export interface PostData_user {
  __typename: "UserProfile";
  photo: string | null;
  username: string | null;
  id: string;
}

export interface PostData {
  __typename: "PostAll";
  id: string;
  photos: string;
  placeId: string;
  address: string;
  contents: string;
  liked: boolean;
  user: PostData_user;
}
