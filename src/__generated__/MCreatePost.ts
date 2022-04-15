/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePostInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreatePost
// ====================================================

export interface MCreatePost_createPost {
  __typename: "CreatePostOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreatePost {
  createPost: MCreatePost_createPost;
}

export interface MCreatePostVariables {
  args: CreatePostInputDto;
}
