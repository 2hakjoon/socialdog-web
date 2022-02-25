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

export interface CreatePostInputDto {
  address: string;
  placeId: string;
  contents: string;
  photos: string[];
}

export interface CreatePreSignedUrlsInputDto {
  files: FileInputDto[];
}

export interface FileInputDto {
  filename: string;
  fileType: FileType;
}

export interface KakaoLoginInputDto {
  accessToken: string;
  accessTokenExpiresAt?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: string | null;
  scopes?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
