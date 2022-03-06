/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: post
// ====================================================

export interface post_likedUsers {
  __typename: "Likes";
  like: boolean;
}

export interface post {
  __typename: "PostAll";
  likedUsers: post_likedUsers[] | null;
}
