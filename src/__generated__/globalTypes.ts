/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * BlockState
 */
export enum BlockState {
  BLOCKED = "BLOCKED",
  BLOCKING = "BLOCKING",
  NONE = "NONE",
}

/**
 * upload file type.
 */
export enum FileType {
  IMAGE = "IMAGE",
}

/**
 * ReportCommentsType
 */
export enum ReportCommentsType {
  ADVERTISMENT = "ADVERTISMENT",
  NEGATIVE_POST = "NEGATIVE_POST",
  OTHER = "OTHER",
  SEXUAL_CONTENTS = "SEXUAL_CONTENTS",
}

/**
 * ReportPostsType
 */
export enum ReportPostsType {
  ADVERTISMENT = "ADVERTISMENT",
  NEGATIVE_POST = "NEGATIVE_POST",
  OTHER = "OTHER",
  SEXUAL_CONTENTS = "SEXUAL_CONTENTS",
}

/**
 * ReportUsersType
 */
export enum ReportUsersType {
  ADVERTISMENT = "ADVERTISMENT",
  INAPPROPRIATE_PROFILE = "INAPPROPRIATE_PROFILE",
  OTHER = "OTHER",
  VIOLATION_PATTERN = "VIOLATION_PATTERN",
}

/**
 * SubscribeRequestState
 */
export enum SubscribeRequestState {
  CONFIRMED = "CONFIRMED",
  NONE = "NONE",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
}

export interface CancelSubscribeRequestInputDto {
  to: string;
}

export interface CancelSubscribingInputDto {
  to: string;
}

export interface ChangeBlockStateInputDto {
  block: boolean;
  username?: string | null;
}

export interface CheckUsernameExistInputDto {
  username: string;
}

export interface CreateCommentInputDto {
  content: string;
  postId: string;
}

export interface CreatePostInputDto {
  address?: string | null;
  placeId?: string | null;
  contents: string;
  photoUrls: string[];
}

export interface CreatePreSignedUrlsInputDto {
  files: FileInputDto[];
}

export interface CreateReCommentInputDto {
  content: string;
  parentCommentId: string;
  postId: string;
}

export interface CreateReportBugInputDto {
  comment: string;
}

export interface CreateReportCommentInputDto {
  reportType: ReportCommentsType;
  comment: string;
  reportedCommentId: string;
}

export interface CreateReportPostInputDto {
  reportType: ReportPostsType;
  comment: string;
  reportedPostId: string;
}

export interface CreateReportUserInputDto {
  reportType: ReportUsersType;
  comment: string;
  reportedUserId: string;
}

export interface CursorArgs {
  id?: string | null;
  createdAt?: string | null;
}

export interface CursorPaginationInputDto {
  take: number;
  cursor?: CursorArgs | null;
}

export interface DeleteCommentInputDto {
  id: string;
}

export interface DeletePostInputDto {
  id: string;
}

export interface EditCommentInputDto {
  id: string;
  content: string;
}

export interface EditPostInputDto {
  address?: string | null;
  placeId?: string | null;
  contents?: string | null;
  postId: string;
  photoUrls?: string[] | null;
}

export interface EditProfileInputDto {
  username?: string | null;
  photo?: string | null;
  profileOpen?: boolean | null;
  password?: string | null;
}

export interface FileInputDto {
  filename: string;
  fileType: FileType;
}

export interface FindUserByUsernameInputDto {
  username: string;
}

export interface GetCommentInputDto {
  id: string;
}

export interface GetCommentsInputDto {
  postId: string;
}

export interface GetPostDetailInputDto {
  id: string;
}

export interface GetReCommentsInputDto {
  parentCommentId: string;
}

export interface GetUserInputDto {
  username: string;
}

export interface KakaoLoginInputDto {
  accessToken: string;
  accessTokenExpiresAt?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: string | null;
  scopes?: string | null;
}

export interface ReissueAccessTokenInputDto {
  accessToken: string;
  refreshToken: string;
}

export interface RequestSubscribeInputDto {
  to: string;
}

export interface ResponseSubscribeInputDto {
  from: string;
  subscribeRequest: SubscribeRequestState;
}

export interface ToggleLikePostInputDto {
  postId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
