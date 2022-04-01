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
  username: string;
  id: string;
}

export interface PostData {
  __typename: "Posts";
  id: string;
  photos: string;
  placeId: string | null;
  address: string | null;
  contents: string;
  liked: boolean;
  commentCounts: number | null;
  createdAt: string;
  updatedAt: string;
  user: PostData_user;
}
