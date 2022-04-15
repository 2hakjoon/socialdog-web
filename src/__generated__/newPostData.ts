/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: newPostData
// ====================================================

export interface newPostData_likedUsers {
  __typename: "Likes";
  like: boolean;
}

export interface newPostData {
  __typename: "PostAll";
  id: string;
  likedUsers: newPostData_likedUsers[] | null;
}
