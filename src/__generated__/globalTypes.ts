/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * upload file type.
 */
export enum FileType {
  IMAGE = "IMAGE",
}

export enum LoginStrategy {
  KAKAO = "KAKAO",
  LOCAL = "LOCAL",
}

export interface CreatePostInputDto {
  address: string;
  placeId: string;
  contents: string;
  photos: string[];
}

export interface CreatePreSignedUrlsInputDto {
  files: FileInputDto[];
}

export interface EditProfileInputDto {
  username?: string | null;
  dogname?: string | null;
  photo?: string | null;
  password?: string | null;
}

export interface FileInputDto {
  filename: string;
  fileType: FileType;
}

export interface GetMyPostsInputDto {
  offset: number;
  limit: number;
}

export interface KakaoLoginInputDto {
  accessToken: string;
  accessTokenExpiresAt?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: string | null;
  scopes?: string | null;
}

export interface ToggleLikePostInputDto {
  postId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
