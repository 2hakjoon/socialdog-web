/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentData
// ====================================================

export interface CommentData_user {
  __typename: "UserProfile";
  id: string;
  username: string;
  photo: string | null;
}

export interface CommentData {
  __typename: "Comments";
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentData_user;
}
