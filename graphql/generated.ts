import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** BlockState */
export enum BlockState {
  Blocked = 'BLOCKED',
  Blocking = 'BLOCKING',
  None = 'NONE'
}

export type CancelSubscribeRequestInputDto = {
  to: Scalars['String'];
};

export type CancelSubscribeRequestOutputDto = {
  __typename?: 'CancelSubscribeRequestOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CancelSubscribingInputDto = {
  to: Scalars['String'];
};

export type CancelSubscribingOutputDto = {
  __typename?: 'CancelSubscribingOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ChangeBlockStateInputDto = {
  block: Scalars['Boolean'];
  username?: InputMaybe<Scalars['String']>;
};

export type ChangeBlockStateOutputDto = {
  __typename?: 'ChangeBlockStateOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CheckUsernameExistInputDto = {
  username: Scalars['String'];
};

export type CheckUsernameExistOutputDto = {
  __typename?: 'CheckUsernameExistOutputDto';
  error?: Maybe<Scalars['String']>;
  isExist: Scalars['Boolean'];
  ok: Scalars['Boolean'];
};

export type Comments = {
  __typename?: 'Comments';
  childComment: Array<Comments>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  depth: Scalars['Float'];
  id: Scalars['String'];
  parentComment: Comments;
  parentCommentId?: Maybe<Scalars['String']>;
  post: Posts;
  postId?: Maybe<Scalars['String']>;
  reCommentCounts: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: UserProfile;
};

export type CoreOutputDto = {
  __typename?: 'CoreOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CoreUserOutputDto = {
  __typename?: 'CoreUserOutputDto';
  data?: Maybe<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CoreWalksOutputDto = {
  __typename?: 'CoreWalksOutputDto';
  data?: Maybe<Array<Walks>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateAccountInputDto = {
  acceptTerms: Scalars['Boolean'];
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateAccountOutputDto = {
  __typename?: 'CreateAccountOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateCommentInputDto = {
  content: Scalars['String'];
  postId: Scalars['String'];
};

export type CreateCommentOutputDto = {
  __typename?: 'CreateCommentOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateDogInputDto = {
  birthDay?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  photo: Scalars['String'];
};

export type CreateDogOutputDto = {
  __typename?: 'CreateDogOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePostInputDto = {
  address?: InputMaybe<Scalars['String']>;
  contents: Scalars['String'];
  photoUrls: Array<Scalars['String']>;
  placeId?: InputMaybe<Scalars['String']>;
};

export type CreatePostOutputDto = {
  __typename?: 'CreatePostOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePreSignedUrlsInputDto = {
  files: Array<FileInputDto>;
};

export type CreatePreSignedUrlsOutputDto = {
  __typename?: 'CreatePreSignedUrlsOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  urls: Array<Scalars['String']>;
};

export type CreateReCommentInputDto = {
  content: Scalars['String'];
  parentCommentId: Scalars['String'];
  postId: Scalars['String'];
};

export type CreateReCommentOutputDto = {
  __typename?: 'CreateReCommentOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateReportBugInputDto = {
  comment: Scalars['String'];
};

export type CreateReportBugOutputDto = {
  __typename?: 'CreateReportBugOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateReportCommentInputDto = {
  comment: Scalars['String'];
  reportType: ReportCommentsType;
  reportedCommentId: Scalars['String'];
};

export type CreateReportCommentOutputDto = {
  __typename?: 'CreateReportCommentOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateReportPostInputDto = {
  comment: Scalars['String'];
  reportType: ReportPostsType;
  reportedPostId: Scalars['String'];
};

export type CreateReportPostOutputDto = {
  __typename?: 'CreateReportPostOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateReportUserInputDto = {
  comment: Scalars['String'];
  reportType: ReportUsersType;
  reportedUserId: Scalars['String'];
};

export type CreateReportUserOutputDto = {
  __typename?: 'CreateReportUserOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateVerificationInputDto = {
  email: Scalars['String'];
};

export type CreateWalkInputDto = {
  dogId?: InputMaybe<Scalars['String']>;
  finishTime: Scalars['Int'];
  startTime: Scalars['Int'];
  walkRecord: Scalars['String'];
  walkingTime: Scalars['Int'];
};

export type CreateWalkOutputDto = {
  __typename?: 'CreateWalkOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CursorArgs = {
  createdAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type CursorPaginationInputDto = {
  cursor?: InputMaybe<CursorArgs>;
  take: Scalars['Int'];
};

export type DeleteCommentInputDto = {
  id: Scalars['String'];
};

export type DeleteCommentOutputDto = {
  __typename?: 'DeleteCommentOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDogInputDto = {
  id: Scalars['String'];
};

export type DeleteDogOutputDto = {
  __typename?: 'DeleteDogOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeletePostInputDto = {
  id: Scalars['String'];
};

export type DeletePostOutputDto = {
  __typename?: 'DeletePostOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteWalkInputDto = {
  walkId: Scalars['String'];
};

export type Dogs = {
  __typename?: 'Dogs';
  birthDay?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Array<UserProfile>;
  userId: Scalars['String'];
  walk: Array<UserProfile>;
};

export type EditCommentInputDto = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type EditCommentOutputDto = {
  __typename?: 'EditCommentOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditDogInputDto = {
  birthDay?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
};

export type EditDogOutputDto = {
  __typename?: 'EditDogOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPostInputDto = {
  address?: InputMaybe<Scalars['String']>;
  contents?: InputMaybe<Scalars['String']>;
  photoUrls?: InputMaybe<Array<Scalars['String']>>;
  placeId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type EditPostOutputDto = {
  __typename?: 'EditPostOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProfileInputDto = {
  password?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  profileOpen?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type EditProfileOutputDto = {
  __typename?: 'EditProfileOutputDto';
  data?: Maybe<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type FileInputDto = {
  fileType: FileType;
  filename: Scalars['String'];
};

/** upload file type. */
export enum FileType {
  Image = 'IMAGE'
}

export type FindUserByUsernameInputDto = {
  username: Scalars['String'];
};

export type FindUserByUsernameOutputDto = {
  __typename?: 'FindUserByUsernameOutputDto';
  data?: Maybe<Array<UserProfile>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetBlockingUsersOutputDto = {
  __typename?: 'GetBlockingUsersOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetCommentInputDto = {
  id: Scalars['String'];
};

export type GetCommentOutputDto = {
  __typename?: 'GetCommentOutputDto';
  data: Comments;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetCommentsInputDto = {
  postId: Scalars['String'];
};

export type GetCommentsOutputDto = {
  __typename?: 'GetCommentsOutputDto';
  data: Array<Comments>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetDogInputDto = {
  id: Scalars['String'];
};

export type GetDogOutputDto = {
  __typename?: 'GetDogOutputDto';
  data?: Maybe<Dogs>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMyDogsOutputDto = {
  __typename?: 'GetMyDogsOutputDto';
  data?: Maybe<Array<Dogs>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMyLikedPostsOutputDto = {
  __typename?: 'GetMyLikedPostsOutputDto';
  data: Array<Posts>;
  error?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  ok: Scalars['Boolean'];
};

export type GetMyPostsOutputDto = {
  __typename?: 'GetMyPostsOutputDto';
  data: Array<Posts>;
  error?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  ok: Scalars['Boolean'];
};

export type GetMyRejectRequestsOutputDto = {
  __typename?: 'GetMyRejectRequestsOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMySubscribersOutputDto = {
  __typename?: 'GetMySubscribersOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetMySubscribingsOutputDto = {
  __typename?: 'GetMySubscribingsOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetPostDetailInputDto = {
  id: Scalars['String'];
};

export type GetPostDetailOutputDto = {
  __typename?: 'GetPostDetailOutputDto';
  data?: Maybe<Posts>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetPostsByAddressInputDto = {
  address: Scalars['String'];
};

export type GetProfileOpenUserOutputDto = {
  __typename?: 'GetProfileOpenUserOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetReCommentsInputDto = {
  parentCommentId: Scalars['String'];
};

export type GetReCommentsOutputDto = {
  __typename?: 'GetReCommentsOutputDto';
  data: Array<Comments>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetSubscribeRequestsOutputDto = {
  __typename?: 'GetSubscribeRequestsOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetSubscribingPostsOutputDto = {
  __typename?: 'GetSubscribingPostsOutputDto';
  data: Array<Posts>;
  error?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  ok: Scalars['Boolean'];
};

export type GetSubscribingRequestsOutputDto = {
  __typename?: 'GetSubscribingRequestsOutputDto';
  data: Array<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetUserInputDto = {
  username: Scalars['String'];
};

export type GetUserOutputDto = {
  __typename?: 'GetUserOutputDto';
  blocking?: Maybe<BlockState>;
  data?: Maybe<UserProfile>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  profileOpened?: Maybe<Scalars['Boolean']>;
  subscribeRequested?: Maybe<SubscribeRequestState>;
};

export type GetUserPostsInputDto = {
  username: Scalars['String'];
};

export type GetUserPostsOutputDto = {
  __typename?: 'GetUserPostsOutputDto';
  data: Array<Posts>;
  error?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  ok: Scalars['Boolean'];
};

export type GetWalkInputDto = {
  walkId: Scalars['String'];
};

export type GetWalkOutputDto = {
  __typename?: 'GetWalkOutputDto';
  data?: Maybe<Walks>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type KakaoLoginInputDto = {
  acceptTerms: Scalars['Boolean'];
  accessToken: Scalars['String'];
  accessTokenExpiresAt?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  refreshTokenExpiresAt?: InputMaybe<Scalars['String']>;
  scopes?: InputMaybe<Scalars['String']>;
};

export type Likes = {
  __typename?: 'Likes';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  like: Scalars['Boolean'];
  post: Posts;
  postId: Scalars['String'];
  updatedAt: Scalars['String'];
  user: UserProfile;
  userId: Scalars['String'];
};

export type LoginInputDto = {
  acceptTerms: Scalars['Boolean'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutputDto = {
  __typename?: 'LoginOutputDto';
  acceptTerms?: Maybe<Scalars['Boolean']>;
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  refreshToken?: Maybe<Scalars['String']>;
};

export enum LoginStrategy {
  Kakao = 'KAKAO',
  Local = 'LOCAL'
}

export type Mutation = {
  __typename?: 'Mutation';
  cancelSubscribing: CancelSubscribingOutputDto;
  cancelSubscribingRequest: CancelSubscribeRequestOutputDto;
  changeBlockState: ChangeBlockStateOutputDto;
  createComment: CreateCommentOutputDto;
  createDog: CreateDogOutputDto;
  createLocalAccount: CreateAccountOutputDto;
  createPost: CreatePostOutputDto;
  createPreSignedUrls: CreatePreSignedUrlsOutputDto;
  createReComment: CreateReCommentOutputDto;
  createReportBug: CreateReportBugOutputDto;
  createReportComment: CreateReportCommentOutputDto;
  createReportPost: CreateReportPostOutputDto;
  createReportUser: CreateReportUserOutputDto;
  createVerification: CoreOutputDto;
  createWalk: CreateWalkOutputDto;
  deleteComment: DeleteCommentOutputDto;
  deleteDog: DeleteDogOutputDto;
  deletePost: DeletePostOutputDto;
  deleteWalk: CoreOutputDto;
  editComment: EditCommentOutputDto;
  editDog: EditDogOutputDto;
  editPost: EditPostOutputDto;
  editProfile: EditProfileOutputDto;
  kakaoLogin: LoginOutputDto;
  localLogin: LoginOutputDto;
  reissueAccessToken: ReissueAccessTokenOutputDto;
  requestSubscribe: RequestSubscribeOutputDto;
  responseSubscribe: ResponseSubscribeOutputDto;
  toggleLikePost: ToggleLikePostOutputDto;
  updateAuthKakaoAcceptTerm: UpdateAuthKakaoAcceptTermOutputDto;
  updateAuthLocalAcceptTerm: UpdateAuthLocalAcceptTermOutputDto;
};


export type MutationCancelSubscribingArgs = {
  args: CancelSubscribingInputDto;
};


export type MutationCancelSubscribingRequestArgs = {
  args: CancelSubscribeRequestInputDto;
};


export type MutationChangeBlockStateArgs = {
  args: ChangeBlockStateInputDto;
};


export type MutationCreateCommentArgs = {
  args: CreateCommentInputDto;
};


export type MutationCreateDogArgs = {
  args: CreateDogInputDto;
};


export type MutationCreateLocalAccountArgs = {
  args: CreateAccountInputDto;
};


export type MutationCreatePostArgs = {
  args: CreatePostInputDto;
};


export type MutationCreatePreSignedUrlsArgs = {
  args: CreatePreSignedUrlsInputDto;
};


export type MutationCreateReCommentArgs = {
  args: CreateReCommentInputDto;
};


export type MutationCreateReportBugArgs = {
  args: CreateReportBugInputDto;
};


export type MutationCreateReportCommentArgs = {
  args: CreateReportCommentInputDto;
};


export type MutationCreateReportPostArgs = {
  args: CreateReportPostInputDto;
};


export type MutationCreateReportUserArgs = {
  args: CreateReportUserInputDto;
};


export type MutationCreateVerificationArgs = {
  args: CreateVerificationInputDto;
};


export type MutationCreateWalkArgs = {
  args: CreateWalkInputDto;
};


export type MutationDeleteCommentArgs = {
  args: DeleteCommentInputDto;
};


export type MutationDeleteDogArgs = {
  args: DeleteDogInputDto;
};


export type MutationDeletePostArgs = {
  args: DeletePostInputDto;
};


export type MutationDeleteWalkArgs = {
  args: DeleteWalkInputDto;
};


export type MutationEditCommentArgs = {
  args: EditCommentInputDto;
};


export type MutationEditDogArgs = {
  args: EditDogInputDto;
};


export type MutationEditPostArgs = {
  args: EditPostInputDto;
};


export type MutationEditProfileArgs = {
  args: EditProfileInputDto;
};


export type MutationKakaoLoginArgs = {
  args: KakaoLoginInputDto;
};


export type MutationLocalLoginArgs = {
  args: LoginInputDto;
};


export type MutationReissueAccessTokenArgs = {
  args: ReissueAccessTokenInputDto;
};


export type MutationRequestSubscribeArgs = {
  args: RequestSubscribeInputDto;
};


export type MutationResponseSubscribeArgs = {
  args: ResponseSubscribeInputDto;
};


export type MutationToggleLikePostArgs = {
  args: ToggleLikePostInputDto;
};


export type MutationUpdateAuthKakaoAcceptTermArgs = {
  args: UpdateAuthKakaoAcceptTermInputDto;
};


export type MutationUpdateAuthLocalAcceptTermArgs = {
  args: UpdateAuthLocalAcceptTermInputDto;
};

export type Posts = {
  __typename?: 'Posts';
  address?: Maybe<Scalars['String']>;
  commentCounts: Scalars['Int'];
  comments?: Maybe<Array<Comments>>;
  contents: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  liked: Scalars['Boolean'];
  likedUsers?: Maybe<Array<Likes>>;
  likes: Scalars['Int'];
  photos: Scalars['String'];
  placeId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: UserProfile;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkUsernameExist: CheckUsernameExistOutputDto;
  findUsersByUsername: FindUserByUsernameOutputDto;
  getComment: GetCommentOutputDto;
  getComments: GetCommentsOutputDto;
  getDog: GetDogOutputDto;
  getMyBlockingUsers: GetBlockingUsersOutputDto;
  getMyDogs: GetMyDogsOutputDto;
  getMyLikedPosts: GetMyLikedPostsOutputDto;
  getMyPosts: GetMyPostsOutputDto;
  getMyRejectRequests: GetMyRejectRequestsOutputDto;
  getMySubscribers: GetMySubscribersOutputDto;
  getMySubscribings: GetMySubscribingsOutputDto;
  getPostDetail: GetPostDetailOutputDto;
  getPostsByAddress: GetPostsByAddressOutputDto;
  getProfileOpenUser: GetProfileOpenUserOutputDto;
  getReComments: GetReCommentsOutputDto;
  getSubscribeRequests: GetSubscribeRequestsOutputDto;
  getSubscribingPosts: GetSubscribingPostsOutputDto;
  getSubscribingRequests: GetSubscribingRequestsOutputDto;
  getUserPosts: GetUserPostsOutputDto;
  getUserProfile: GetUserOutputDto;
  getWalk: GetWalkOutputDto;
  getWalks: CoreWalksOutputDto;
  me: CoreUserOutputDto;
  verifyEmailAndCode: CoreOutputDto;
};


export type QueryCheckUsernameExistArgs = {
  args: CheckUsernameExistInputDto;
};


export type QueryFindUsersByUsernameArgs = {
  args: FindUserByUsernameInputDto;
};


export type QueryGetCommentArgs = {
  args: GetCommentInputDto;
};


export type QueryGetCommentsArgs = {
  args: GetCommentsInputDto;
  page: CursorPaginationInputDto;
};


export type QueryGetDogArgs = {
  args: GetDogInputDto;
};


export type QueryGetMyLikedPostsArgs = {
  page: CursorPaginationInputDto;
};


export type QueryGetMyPostsArgs = {
  args: CursorPaginationInputDto;
};


export type QueryGetPostDetailArgs = {
  args: GetPostDetailInputDto;
};


export type QueryGetPostsByAddressArgs = {
  args: GetPostsByAddressInputDto;
  page: CursorPaginationInputDto;
};


export type QueryGetReCommentsArgs = {
  args: GetReCommentsInputDto;
  page: CursorPaginationInputDto;
};


export type QueryGetSubscribingPostsArgs = {
  page: CursorPaginationInputDto;
};


export type QueryGetUserPostsArgs = {
  args: GetUserPostsInputDto;
  page: CursorPaginationInputDto;
};


export type QueryGetUserProfileArgs = {
  args: GetUserInputDto;
};


export type QueryGetWalkArgs = {
  args: GetWalkInputDto;
};


export type QueryVerifyEmailAndCodeArgs = {
  args: VerifyEmailAndCodeInputDto;
};

export type ReissueAccessTokenInputDto = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type ReissueAccessTokenOutputDto = {
  __typename?: 'ReissueAccessTokenOutputDto';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  isRefreshTokenExpired?: Maybe<Scalars['Boolean']>;
  ok: Scalars['Boolean'];
};

export type ReportBugs = {
  __typename?: 'ReportBugs';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reportUserId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReportComments = {
  __typename?: 'ReportComments';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reportType: ReportCommentsType;
  reportUserId: Scalars['String'];
  reportedCommentId: Scalars['String'];
  updatedAt: Scalars['String'];
};

/** ReportCommentsType */
export enum ReportCommentsType {
  Advertisment = 'ADVERTISMENT',
  NegativePost = 'NEGATIVE_POST',
  Other = 'OTHER',
  SexualContents = 'SEXUAL_CONTENTS'
}

export type ReportPosts = {
  __typename?: 'ReportPosts';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reportType: ReportPostsType;
  reportUserId: Scalars['String'];
  reportedPostId: Scalars['String'];
  updatedAt: Scalars['String'];
};

/** ReportPostsType */
export enum ReportPostsType {
  Advertisment = 'ADVERTISMENT',
  NegativePost = 'NEGATIVE_POST',
  Other = 'OTHER',
  SexualContents = 'SEXUAL_CONTENTS'
}

export type ReportUsers = {
  __typename?: 'ReportUsers';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reportType: ReportUsersType;
  reportUserId: Scalars['String'];
  reportedUserId: Scalars['String'];
  updatedAt: Scalars['String'];
};

/** ReportUsersType */
export enum ReportUsersType {
  Advertisment = 'ADVERTISMENT',
  InappropriateProfile = 'INAPPROPRIATE_PROFILE',
  Other = 'OTHER',
  ViolationPattern = 'VIOLATION_PATTERN'
}

export type RequestSubscribeInputDto = {
  to: Scalars['String'];
};

export type RequestSubscribeOutputDto = {
  __typename?: 'RequestSubscribeOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ResponseSubscribeInputDto = {
  from: Scalars['String'];
  subscribeRequest: SubscribeRequestState;
};

export type ResponseSubscribeOutputDto = {
  __typename?: 'ResponseSubscribeOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

/** SubscribeRequestState */
export enum SubscribeRequestState {
  Confirmed = 'CONFIRMED',
  None = 'NONE',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type Subscribes = {
  __typename?: 'Subscribes';
  block: Scalars['Boolean'];
  createdAt: Scalars['String'];
  from: Scalars['String'];
  id: Scalars['String'];
  subscribeRequest: SubscribeRequestState;
  to: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ToggleLikePostInputDto = {
  postId: Scalars['String'];
};

export type ToggleLikePostOutputDto = {
  __typename?: 'ToggleLikePostOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateAuthKakaoAcceptTermInputDto = {
  acceptTerms: Scalars['Boolean'];
};

export type UpdateAuthKakaoAcceptTermOutputDto = {
  __typename?: 'UpdateAuthKakaoAcceptTermOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateAuthLocalAcceptTermInputDto = {
  acceptTerms: Scalars['Boolean'];
};

export type UpdateAuthLocalAcceptTermOutputDto = {
  __typename?: 'UpdateAuthLocalAcceptTermOutputDto';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  comments?: Maybe<Array<Comments>>;
  createdAt: Scalars['String'];
  dogs?: Maybe<Array<Dogs>>;
  id: Scalars['String'];
  liked?: Maybe<Array<Likes>>;
  loginStrategy: LoginStrategy;
  photo?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Posts>>;
  profileOpen?: Maybe<Scalars['Boolean']>;
  subscribeUsers?: Maybe<Array<Subscribes>>;
  subscribers: Scalars['Int'];
  subscribingUsers?: Maybe<Array<Subscribes>>;
  subscribings: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  walks?: Maybe<Array<Walks>>;
};

export type VerifyEmailAndCodeInputDto = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Walks = {
  __typename?: 'Walks';
  createdAt: Scalars['String'];
  dog?: Maybe<UserProfile>;
  dogId?: Maybe<Scalars['String']>;
  finishTime: Scalars['Int'];
  id: Scalars['String'];
  startTime: Scalars['Int'];
  updatedAt: Scalars['String'];
  user?: Maybe<UserProfile>;
  userId?: Maybe<Scalars['String']>;
  walkRecord: Scalars['String'];
  walkingTime: Scalars['Int'];
};

export type GetPostsByAddressOutputDto = {
  __typename?: 'getPostsByAddressOutputDto';
  data: Array<Posts>;
  error?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  ok: Scalars['Boolean'];
};

export type MKakaoLoginMutationVariables = Exact<{
  args: KakaoLoginInputDto;
}>;


export type MKakaoLoginMutation = { __typename?: 'Mutation', kakaoLogin: { __typename?: 'LoginOutputDto', ok: boolean, error?: string | null, accessToken?: string | null, refreshToken?: string | null, acceptTerms?: boolean | null } };

export type MReissueAccessTokenMutationVariables = Exact<{
  args: ReissueAccessTokenInputDto;
}>;


export type MReissueAccessTokenMutation = { __typename?: 'Mutation', reissueAccessToken: { __typename?: 'ReissueAccessTokenOutputDto', ok: boolean, error?: string | null, accessToken?: string | null, isRefreshTokenExpired?: boolean | null } };

export type MUpdateAuthKakaoAcceptTermMutationVariables = Exact<{
  args: UpdateAuthKakaoAcceptTermInputDto;
}>;


export type MUpdateAuthKakaoAcceptTermMutation = { __typename?: 'Mutation', updateAuthKakaoAcceptTerm: { __typename?: 'UpdateAuthKakaoAcceptTermOutputDto', ok: boolean, error?: string | null } };

export type MUpdateAuthLocalAcceptTermMutationVariables = Exact<{
  args: UpdateAuthLocalAcceptTermInputDto;
}>;


export type MUpdateAuthLocalAcceptTermMutation = { __typename?: 'Mutation', updateAuthLocalAcceptTerm: { __typename?: 'UpdateAuthLocalAcceptTermOutputDto', ok: boolean, error?: string | null } };

export type CommentDataFragment = { __typename?: 'Comments', id: string, content: string, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null } };

export type QGetCommentsQueryVariables = Exact<{
  page: CursorPaginationInputDto;
  args: GetCommentsInputDto;
}>;


export type QGetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'GetCommentsOutputDto', ok: boolean, error?: string | null, data: Array<{ __typename?: 'Comments', reCommentCounts: number, id: string, content: string, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null } }> } };

export type MCreateCommentMutationVariables = Exact<{
  args: CreateCommentInputDto;
}>;


export type MCreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentOutputDto', ok: boolean, error?: string | null } };

export type MEditCommentMutationVariables = Exact<{
  args: EditCommentInputDto;
}>;


export type MEditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'EditCommentOutputDto', ok: boolean, error?: string | null } };

export type MCreateReCommentMutationVariables = Exact<{
  args: CreateReCommentInputDto;
}>;


export type MCreateReCommentMutation = { __typename?: 'Mutation', createReComment: { __typename?: 'CreateReCommentOutputDto', ok: boolean, error?: string | null } };

export type QGetReCommentsQueryVariables = Exact<{
  page: CursorPaginationInputDto;
  args: GetReCommentsInputDto;
}>;


export type QGetReCommentsQuery = { __typename?: 'Query', getReComments: { __typename?: 'GetReCommentsOutputDto', ok: boolean, error?: string | null, data: Array<{ __typename?: 'Comments', id: string, content: string, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null } }> } };

export type MDeleteCommentMutationVariables = Exact<{
  args: DeleteCommentInputDto;
}>;


export type MDeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentOutputDto', ok: boolean, error?: string | null } };

export type QGetCommentQueryVariables = Exact<{
  args: GetCommentInputDto;
}>;


export type QGetCommentQuery = { __typename?: 'Query', getComment: { __typename?: 'GetCommentOutputDto', ok: boolean, error?: string | null, data: { __typename?: 'Comments', postId?: string | null, id: string, content: string, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null } } } };

export type PostDataFragment = { __typename?: 'Posts', id: string, photos: string, placeId?: string | null, address?: string | null, contents: string, liked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', photo?: string | null, username: string, id: string } };

export type QGetSubscribingPostsQueryVariables = Exact<{
  page: CursorPaginationInputDto;
}>;


export type QGetSubscribingPostsQuery = { __typename?: 'Query', getSubscribingPosts: { __typename?: 'GetSubscribingPostsOutputDto', ok: boolean, error?: string | null, length: number, data: Array<{ __typename?: 'Posts', commentCounts: number, likes: number, id: string, photos: string, placeId?: string | null, address?: string | null, contents: string, liked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', photo?: string | null, username: string, id: string } }> } };

export type MCreatePostMutationVariables = Exact<{
  args: CreatePostInputDto;
}>;


export type MCreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostOutputDto', ok: boolean, error?: string | null } };

export type MCreatePreSignedUrlsMutationVariables = Exact<{
  args: CreatePreSignedUrlsInputDto;
}>;


export type MCreatePreSignedUrlsMutation = { __typename?: 'Mutation', createPreSignedUrls: { __typename?: 'CreatePreSignedUrlsOutputDto', ok: boolean, error?: string | null, urls: Array<string> } };

export type MToggleLikePostMutationVariables = Exact<{
  args: ToggleLikePostInputDto;
}>;


export type MToggleLikePostMutation = { __typename?: 'Mutation', toggleLikePost: { __typename?: 'ToggleLikePostOutputDto', ok: boolean, error?: string | null } };

export type QGetMyPostsQueryVariables = Exact<{
  args: CursorPaginationInputDto;
}>;


export type QGetMyPostsQuery = { __typename?: 'Query', getMyPosts: { __typename?: 'GetMyPostsOutputDto', ok: boolean, error?: string | null, length: number, data: Array<{ __typename?: 'Posts', createdAt: string, photos: string, id: string }> } };

export type QGetUserPostsQueryVariables = Exact<{
  username: Scalars['String'];
  page: CursorPaginationInputDto;
}>;


export type QGetUserPostsQuery = { __typename?: 'Query', getUserPosts: { __typename?: 'GetUserPostsOutputDto', ok: boolean, error?: string | null, length: number, data: Array<{ __typename?: 'Posts', createdAt: string, photos: string, id: string }> } };

export type QGetPostsByAddressQueryVariables = Exact<{
  address: Scalars['String'];
  page: CursorPaginationInputDto;
}>;


export type QGetPostsByAddressQuery = { __typename?: 'Query', getPostsByAddress: { __typename?: 'getPostsByAddressOutputDto', ok: boolean, error?: string | null, length: number, data: Array<{ __typename?: 'Posts', commentCounts: number, likes: number, id: string, photos: string, placeId?: string | null, address?: string | null, contents: string, liked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', photo?: string | null, username: string, id: string } }> } };

export type QGetMyLikedPostsQueryVariables = Exact<{
  page: CursorPaginationInputDto;
}>;


export type QGetMyLikedPostsQuery = { __typename?: 'Query', getMyLikedPosts: { __typename?: 'GetMyLikedPostsOutputDto', length: number, ok: boolean, error?: string | null, data: Array<{ __typename?: 'Posts', id: string, photos: string, placeId?: string | null, address?: string | null, contents: string, liked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', photo?: string | null, username: string, id: string } }> } };

export type MEditPostMutationVariables = Exact<{
  args: EditPostInputDto;
}>;


export type MEditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'EditPostOutputDto', ok: boolean, error?: string | null } };

export type MDeletePostMutationVariables = Exact<{
  args: DeletePostInputDto;
}>;


export type MDeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostOutputDto', error?: string | null, ok: boolean } };

export type QGetPostDetailQueryVariables = Exact<{
  args: GetPostDetailInputDto;
}>;


export type QGetPostDetailQuery = { __typename?: 'Query', getPostDetail: { __typename?: 'GetPostDetailOutputDto', ok: boolean, error?: string | null, data?: { __typename?: 'Posts', likes: number, commentCounts: number, id: string, photos: string, placeId?: string | null, address?: string | null, contents: string, liked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'UserProfile', photo?: string | null, username: string, id: string } } | null } };

export type MCreateReportUserMutationVariables = Exact<{
  args: CreateReportUserInputDto;
}>;


export type MCreateReportUserMutation = { __typename?: 'Mutation', createReportUser: { __typename?: 'CreateReportUserOutputDto', ok: boolean, error?: string | null } };

export type MCreateReportPostMutationVariables = Exact<{
  args: CreateReportPostInputDto;
}>;


export type MCreateReportPostMutation = { __typename?: 'Mutation', createReportPost: { __typename?: 'CreateReportPostOutputDto', ok: boolean, error?: string | null } };

export type MCreateReportCommentMutationVariables = Exact<{
  args: CreateReportCommentInputDto;
}>;


export type MCreateReportCommentMutation = { __typename?: 'Mutation', createReportComment: { __typename?: 'CreateReportCommentOutputDto', ok: boolean, error?: string | null } };

export type MCreateReportBugMutationVariables = Exact<{
  args: CreateReportBugInputDto;
}>;


export type MCreateReportBugMutation = { __typename?: 'Mutation', createReportBug: { __typename?: 'CreateReportBugOutputDto', ok: boolean, error?: string | null } };

export type QGetMySubscribingsRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type QGetMySubscribingsRequestsQuery = { __typename?: 'Query', getMySubscribings: { __typename?: 'GetMySubscribingsOutputDto', ok: boolean, data: Array<{ __typename?: 'UserProfile', photo?: string | null, username: string, id: string }> }, getSubscribingRequests: { __typename?: 'GetSubscribingRequestsOutputDto', data: Array<{ __typename?: 'UserProfile', updatedAt: string, id: string, username: string, photo?: string | null }> } };

export type QGetMySubscribersRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type QGetMySubscribersRequestsQuery = { __typename?: 'Query', getMySubscribers: { __typename?: 'GetMySubscribersOutputDto', ok: boolean, data: Array<{ __typename?: 'UserProfile', photo?: string | null, username: string, id: string }> }, getSubscribeRequests: { __typename?: 'GetSubscribeRequestsOutputDto', data: Array<{ __typename?: 'UserProfile', updatedAt: string, id: string, username: string, photo?: string | null }> } };

export type McancelSubscribingMutationVariables = Exact<{
  args: CancelSubscribingInputDto;
}>;


export type McancelSubscribingMutation = { __typename?: 'Mutation', cancelSubscribing: { __typename?: 'CancelSubscribingOutputDto', ok: boolean, error?: string | null } };

export type MRequestSubscribeMutationVariables = Exact<{
  args: RequestSubscribeInputDto;
}>;


export type MRequestSubscribeMutation = { __typename?: 'Mutation', requestSubscribe: { __typename?: 'RequestSubscribeOutputDto', ok: boolean, error?: string | null } };

export type MCancelSubscribingRequestMutationVariables = Exact<{
  args: CancelSubscribeRequestInputDto;
}>;


export type MCancelSubscribingRequestMutation = { __typename?: 'Mutation', cancelSubscribingRequest: { __typename?: 'CancelSubscribeRequestOutputDto', error?: string | null, ok: boolean } };

export type MResponseSubscribeMutationVariables = Exact<{
  args: ResponseSubscribeInputDto;
}>;


export type MResponseSubscribeMutation = { __typename?: 'Mutation', responseSubscribe: { __typename?: 'ResponseSubscribeOutputDto', error?: string | null, ok: boolean } };

export type MChangeBlockStateMutationVariables = Exact<{
  args: ChangeBlockStateInputDto;
}>;


export type MChangeBlockStateMutation = { __typename?: 'Mutation', changeBlockState: { __typename?: 'ChangeBlockStateOutputDto', ok: boolean, error?: string | null } };

export type QGetMyBlockAndRejectQueryVariables = Exact<{ [key: string]: never; }>;


export type QGetMyBlockAndRejectQuery = { __typename?: 'Query', getMyRejectRequests: { __typename?: 'GetMyRejectRequestsOutputDto', ok: boolean, error?: string | null, data: Array<{ __typename?: 'UserProfile', id: string, username: string, photo?: string | null }> }, getMyBlockingUsers: { __typename?: 'GetBlockingUsersOutputDto', ok: boolean, error?: string | null, data: Array<{ __typename?: 'UserProfile', id: string, username: string, photo?: string | null }> } };

export type QMeQueryVariables = Exact<{ [key: string]: never; }>;


export type QMeQuery = { __typename?: 'Query', me: { __typename?: 'CoreUserOutputDto', data?: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null, profileOpen?: boolean | null } | null } };

export type QGetUserProfileQueryVariables = Exact<{
  args: GetUserInputDto;
}>;


export type QGetUserProfileQuery = { __typename?: 'Query', getUserProfile: { __typename?: 'GetUserOutputDto', ok: boolean, error?: string | null, blocking?: BlockState | null, profileOpened?: boolean | null, subscribeRequested?: SubscribeRequestState | null, data?: { __typename?: 'UserProfile', id: string, username: string, photo?: string | null, subscribings: number, subscribers: number } | null } };

export type MEditProfileMutationVariables = Exact<{
  args: EditProfileInputDto;
}>;


export type MEditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutputDto', ok: boolean, error?: string | null } };

export type QFindUserByUsernameQueryVariables = Exact<{
  args: FindUserByUsernameInputDto;
}>;


export type QFindUserByUsernameQuery = { __typename?: 'Query', findUsersByUsername: { __typename?: 'FindUserByUsernameOutputDto', ok: boolean, error?: string | null, data?: Array<{ __typename?: 'UserProfile', photo?: string | null, username: string, id: string }> | null } };

export type QCheckUsernameExistQueryVariables = Exact<{
  args: CheckUsernameExistInputDto;
}>;


export type QCheckUsernameExistQuery = { __typename?: 'Query', checkUsernameExist: { __typename?: 'CheckUsernameExistOutputDto', ok: boolean, error?: string | null, isExist: boolean } };

export type QGetProfileOpenUserQueryVariables = Exact<{ [key: string]: never; }>;


export type QGetProfileOpenUserQuery = { __typename?: 'Query', getProfileOpenUser: { __typename?: 'GetProfileOpenUserOutputDto', ok: boolean, error?: string | null, data: Array<{ __typename?: 'UserProfile', id: string, username: string, photo?: string | null }> } };

export const CommentDataFragmentDoc = `
    fragment CommentData on Comments {
  id
  content
  createdAt
  updatedAt
  user {
    id
    username
    photo
  }
}
    `;
export const PostDataFragmentDoc = `
    fragment PostData on Posts {
  id
  photos
  placeId
  address
  contents
  liked
  createdAt
  updatedAt
  user {
    photo
    username
    id
  }
}
    `;
export const MKakaoLoginDocument = `
    mutation MKakaoLogin($args: KakaoLoginInputDto!) {
  kakaoLogin(args: $args) {
    ok
    error
    accessToken
    refreshToken
    acceptTerms
  }
}
    `;
export const useMKakaoLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MKakaoLoginMutation, TError, MKakaoLoginMutationVariables, TContext>
    ) =>
    useMutation<MKakaoLoginMutation, TError, MKakaoLoginMutationVariables, TContext>(
      ['MKakaoLogin'],
      (variables?: MKakaoLoginMutationVariables) => fetcher<MKakaoLoginMutation, MKakaoLoginMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MKakaoLoginDocument, variables)(),
      options
    );
export const MReissueAccessTokenDocument = `
    mutation MReissueAccessToken($args: ReissueAccessTokenInputDto!) {
  reissueAccessToken(args: $args) {
    ok
    error
    accessToken
    isRefreshTokenExpired
  }
}
    `;
export const useMReissueAccessTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MReissueAccessTokenMutation, TError, MReissueAccessTokenMutationVariables, TContext>
    ) =>
    useMutation<MReissueAccessTokenMutation, TError, MReissueAccessTokenMutationVariables, TContext>(
      ['MReissueAccessToken'],
      (variables?: MReissueAccessTokenMutationVariables) => fetcher<MReissueAccessTokenMutation, MReissueAccessTokenMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MReissueAccessTokenDocument, variables)(),
      options
    );
export const MUpdateAuthKakaoAcceptTermDocument = `
    mutation MUpdateAuthKakaoAcceptTerm($args: UpdateAuthKakaoAcceptTermInputDto!) {
  updateAuthKakaoAcceptTerm(args: $args) {
    ok
    error
  }
}
    `;
export const useMUpdateAuthKakaoAcceptTermMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MUpdateAuthKakaoAcceptTermMutation, TError, MUpdateAuthKakaoAcceptTermMutationVariables, TContext>
    ) =>
    useMutation<MUpdateAuthKakaoAcceptTermMutation, TError, MUpdateAuthKakaoAcceptTermMutationVariables, TContext>(
      ['MUpdateAuthKakaoAcceptTerm'],
      (variables?: MUpdateAuthKakaoAcceptTermMutationVariables) => fetcher<MUpdateAuthKakaoAcceptTermMutation, MUpdateAuthKakaoAcceptTermMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MUpdateAuthKakaoAcceptTermDocument, variables)(),
      options
    );
export const MUpdateAuthLocalAcceptTermDocument = `
    mutation MUpdateAuthLocalAcceptTerm($args: UpdateAuthLocalAcceptTermInputDto!) {
  updateAuthLocalAcceptTerm(args: $args) {
    ok
    error
  }
}
    `;
export const useMUpdateAuthLocalAcceptTermMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MUpdateAuthLocalAcceptTermMutation, TError, MUpdateAuthLocalAcceptTermMutationVariables, TContext>
    ) =>
    useMutation<MUpdateAuthLocalAcceptTermMutation, TError, MUpdateAuthLocalAcceptTermMutationVariables, TContext>(
      ['MUpdateAuthLocalAcceptTerm'],
      (variables?: MUpdateAuthLocalAcceptTermMutationVariables) => fetcher<MUpdateAuthLocalAcceptTermMutation, MUpdateAuthLocalAcceptTermMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MUpdateAuthLocalAcceptTermDocument, variables)(),
      options
    );
export const QGetCommentsDocument = `
    query QGetComments($page: CursorPaginationInputDto!, $args: GetCommentsInputDto!) {
  getComments(page: $page, args: $args) {
    ok
    error
    data {
      reCommentCounts
      ...CommentData
    }
  }
}
    ${CommentDataFragmentDoc}`;
export const useQGetCommentsQuery = <
      TData = QGetCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetCommentsQueryVariables,
      options?: UseQueryOptions<QGetCommentsQuery, TError, TData>
    ) =>
    useQuery<QGetCommentsQuery, TError, TData>(
      ['QGetComments', variables],
      fetcher<QGetCommentsQuery, QGetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetCommentsDocument, variables),
      options
    );
export const MCreateCommentDocument = `
    mutation MCreateComment($args: CreateCommentInputDto!) {
  createComment(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateCommentMutation, TError, MCreateCommentMutationVariables, TContext>
    ) =>
    useMutation<MCreateCommentMutation, TError, MCreateCommentMutationVariables, TContext>(
      ['MCreateComment'],
      (variables?: MCreateCommentMutationVariables) => fetcher<MCreateCommentMutation, MCreateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateCommentDocument, variables)(),
      options
    );
export const MEditCommentDocument = `
    mutation MEditComment($args: EditCommentInputDto!) {
  editComment(args: $args) {
    ok
    error
  }
}
    `;
export const useMEditCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MEditCommentMutation, TError, MEditCommentMutationVariables, TContext>
    ) =>
    useMutation<MEditCommentMutation, TError, MEditCommentMutationVariables, TContext>(
      ['MEditComment'],
      (variables?: MEditCommentMutationVariables) => fetcher<MEditCommentMutation, MEditCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MEditCommentDocument, variables)(),
      options
    );
export const MCreateReCommentDocument = `
    mutation MCreateReComment($args: CreateReCommentInputDto!) {
  createReComment(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateReCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateReCommentMutation, TError, MCreateReCommentMutationVariables, TContext>
    ) =>
    useMutation<MCreateReCommentMutation, TError, MCreateReCommentMutationVariables, TContext>(
      ['MCreateReComment'],
      (variables?: MCreateReCommentMutationVariables) => fetcher<MCreateReCommentMutation, MCreateReCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateReCommentDocument, variables)(),
      options
    );
export const QGetReCommentsDocument = `
    query QGetReComments($page: CursorPaginationInputDto!, $args: GetReCommentsInputDto!) {
  getReComments(page: $page, args: $args) {
    ok
    error
    data {
      ...CommentData
    }
  }
}
    ${CommentDataFragmentDoc}`;
export const useQGetReCommentsQuery = <
      TData = QGetReCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetReCommentsQueryVariables,
      options?: UseQueryOptions<QGetReCommentsQuery, TError, TData>
    ) =>
    useQuery<QGetReCommentsQuery, TError, TData>(
      ['QGetReComments', variables],
      fetcher<QGetReCommentsQuery, QGetReCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetReCommentsDocument, variables),
      options
    );
export const MDeleteCommentDocument = `
    mutation MDeleteComment($args: DeleteCommentInputDto!) {
  deleteComment(args: $args) {
    ok
    error
  }
}
    `;
export const useMDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MDeleteCommentMutation, TError, MDeleteCommentMutationVariables, TContext>
    ) =>
    useMutation<MDeleteCommentMutation, TError, MDeleteCommentMutationVariables, TContext>(
      ['MDeleteComment'],
      (variables?: MDeleteCommentMutationVariables) => fetcher<MDeleteCommentMutation, MDeleteCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MDeleteCommentDocument, variables)(),
      options
    );
export const QGetCommentDocument = `
    query QGetComment($args: GetCommentInputDto!) {
  getComment(args: $args) {
    ok
    error
    data {
      ...CommentData
      postId
    }
  }
}
    ${CommentDataFragmentDoc}`;
export const useQGetCommentQuery = <
      TData = QGetCommentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetCommentQueryVariables,
      options?: UseQueryOptions<QGetCommentQuery, TError, TData>
    ) =>
    useQuery<QGetCommentQuery, TError, TData>(
      ['QGetComment', variables],
      fetcher<QGetCommentQuery, QGetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetCommentDocument, variables),
      options
    );
export const QGetSubscribingPostsDocument = `
    query QGetSubscribingPosts($page: CursorPaginationInputDto!) {
  getSubscribingPosts(page: $page) {
    ok
    error
    data {
      commentCounts
      likes
      ...PostData
    }
    length
  }
}
    ${PostDataFragmentDoc}`;
export const useQGetSubscribingPostsQuery = <
      TData = QGetSubscribingPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetSubscribingPostsQueryVariables,
      options?: UseQueryOptions<QGetSubscribingPostsQuery, TError, TData>
    ) =>
    useQuery<QGetSubscribingPostsQuery, TError, TData>(
      ['QGetSubscribingPosts', variables],
      fetcher<QGetSubscribingPostsQuery, QGetSubscribingPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetSubscribingPostsDocument, variables),
      options
    );
export const MCreatePostDocument = `
    mutation MCreatePost($args: CreatePostInputDto!) {
  createPost(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreatePostMutation, TError, MCreatePostMutationVariables, TContext>
    ) =>
    useMutation<MCreatePostMutation, TError, MCreatePostMutationVariables, TContext>(
      ['MCreatePost'],
      (variables?: MCreatePostMutationVariables) => fetcher<MCreatePostMutation, MCreatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreatePostDocument, variables)(),
      options
    );
export const MCreatePreSignedUrlsDocument = `
    mutation MCreatePreSignedUrls($args: CreatePreSignedUrlsInputDto!) {
  createPreSignedUrls(args: $args) {
    ok
    error
    urls
  }
}
    `;
export const useMCreatePreSignedUrlsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreatePreSignedUrlsMutation, TError, MCreatePreSignedUrlsMutationVariables, TContext>
    ) =>
    useMutation<MCreatePreSignedUrlsMutation, TError, MCreatePreSignedUrlsMutationVariables, TContext>(
      ['MCreatePreSignedUrls'],
      (variables?: MCreatePreSignedUrlsMutationVariables) => fetcher<MCreatePreSignedUrlsMutation, MCreatePreSignedUrlsMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreatePreSignedUrlsDocument, variables)(),
      options
    );
export const MToggleLikePostDocument = `
    mutation MToggleLikePost($args: ToggleLikePostInputDto!) {
  toggleLikePost(args: $args) {
    ok
    error
  }
}
    `;
export const useMToggleLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MToggleLikePostMutation, TError, MToggleLikePostMutationVariables, TContext>
    ) =>
    useMutation<MToggleLikePostMutation, TError, MToggleLikePostMutationVariables, TContext>(
      ['MToggleLikePost'],
      (variables?: MToggleLikePostMutationVariables) => fetcher<MToggleLikePostMutation, MToggleLikePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MToggleLikePostDocument, variables)(),
      options
    );
export const QGetMyPostsDocument = `
    query QGetMyPosts($args: CursorPaginationInputDto!) {
  getMyPosts(args: $args) {
    ok
    error
    data {
      createdAt
      photos
      id
    }
    length
  }
}
    `;
export const useQGetMyPostsQuery = <
      TData = QGetMyPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetMyPostsQueryVariables,
      options?: UseQueryOptions<QGetMyPostsQuery, TError, TData>
    ) =>
    useQuery<QGetMyPostsQuery, TError, TData>(
      ['QGetMyPosts', variables],
      fetcher<QGetMyPostsQuery, QGetMyPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetMyPostsDocument, variables),
      options
    );
export const QGetUserPostsDocument = `
    query QGetUserPosts($username: String!, $page: CursorPaginationInputDto!) {
  getUserPosts(args: {username: $username}, page: $page) @connection(key: $username) {
    ok
    error
    data {
      createdAt
      photos
      id
    }
    length
  }
}
    `;
export const useQGetUserPostsQuery = <
      TData = QGetUserPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetUserPostsQueryVariables,
      options?: UseQueryOptions<QGetUserPostsQuery, TError, TData>
    ) =>
    useQuery<QGetUserPostsQuery, TError, TData>(
      ['QGetUserPosts', variables],
      fetcher<QGetUserPostsQuery, QGetUserPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetUserPostsDocument, variables),
      options
    );
export const QGetPostsByAddressDocument = `
    query QGetPostsByAddress($address: String!, $page: CursorPaginationInputDto!) {
  getPostsByAddress(page: $page, args: {address: $address}) @connection(key: $address) {
    ok
    error
    data {
      commentCounts
      likes
      ...PostData
    }
    length
  }
}
    ${PostDataFragmentDoc}`;
export const useQGetPostsByAddressQuery = <
      TData = QGetPostsByAddressQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetPostsByAddressQueryVariables,
      options?: UseQueryOptions<QGetPostsByAddressQuery, TError, TData>
    ) =>
    useQuery<QGetPostsByAddressQuery, TError, TData>(
      ['QGetPostsByAddress', variables],
      fetcher<QGetPostsByAddressQuery, QGetPostsByAddressQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetPostsByAddressDocument, variables),
      options
    );
export const QGetMyLikedPostsDocument = `
    query QGetMyLikedPosts($page: CursorPaginationInputDto!) {
  getMyLikedPosts(page: $page) {
    data {
      ...PostData
    }
    length
    ok
    error
  }
}
    ${PostDataFragmentDoc}`;
export const useQGetMyLikedPostsQuery = <
      TData = QGetMyLikedPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetMyLikedPostsQueryVariables,
      options?: UseQueryOptions<QGetMyLikedPostsQuery, TError, TData>
    ) =>
    useQuery<QGetMyLikedPostsQuery, TError, TData>(
      ['QGetMyLikedPosts', variables],
      fetcher<QGetMyLikedPostsQuery, QGetMyLikedPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetMyLikedPostsDocument, variables),
      options
    );
export const MEditPostDocument = `
    mutation MEditPost($args: EditPostInputDto!) {
  editPost(args: $args) {
    ok
    error
  }
}
    `;
export const useMEditPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MEditPostMutation, TError, MEditPostMutationVariables, TContext>
    ) =>
    useMutation<MEditPostMutation, TError, MEditPostMutationVariables, TContext>(
      ['MEditPost'],
      (variables?: MEditPostMutationVariables) => fetcher<MEditPostMutation, MEditPostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MEditPostDocument, variables)(),
      options
    );
export const MDeletePostDocument = `
    mutation MDeletePost($args: DeletePostInputDto!) {
  deletePost(args: $args) {
    error
    ok
  }
}
    `;
export const useMDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MDeletePostMutation, TError, MDeletePostMutationVariables, TContext>
    ) =>
    useMutation<MDeletePostMutation, TError, MDeletePostMutationVariables, TContext>(
      ['MDeletePost'],
      (variables?: MDeletePostMutationVariables) => fetcher<MDeletePostMutation, MDeletePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MDeletePostDocument, variables)(),
      options
    );
export const QGetPostDetailDocument = `
    query QGetPostDetail($args: GetPostDetailInputDto!) {
  getPostDetail(args: $args) {
    ok
    error
    data {
      likes
      commentCounts
      ...PostData
    }
  }
}
    ${PostDataFragmentDoc}`;
export const useQGetPostDetailQuery = <
      TData = QGetPostDetailQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetPostDetailQueryVariables,
      options?: UseQueryOptions<QGetPostDetailQuery, TError, TData>
    ) =>
    useQuery<QGetPostDetailQuery, TError, TData>(
      ['QGetPostDetail', variables],
      fetcher<QGetPostDetailQuery, QGetPostDetailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetPostDetailDocument, variables),
      options
    );
export const MCreateReportUserDocument = `
    mutation MCreateReportUser($args: CreateReportUserInputDto!) {
  createReportUser(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateReportUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateReportUserMutation, TError, MCreateReportUserMutationVariables, TContext>
    ) =>
    useMutation<MCreateReportUserMutation, TError, MCreateReportUserMutationVariables, TContext>(
      ['MCreateReportUser'],
      (variables?: MCreateReportUserMutationVariables) => fetcher<MCreateReportUserMutation, MCreateReportUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateReportUserDocument, variables)(),
      options
    );
export const MCreateReportPostDocument = `
    mutation MCreateReportPost($args: CreateReportPostInputDto!) {
  createReportPost(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateReportPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateReportPostMutation, TError, MCreateReportPostMutationVariables, TContext>
    ) =>
    useMutation<MCreateReportPostMutation, TError, MCreateReportPostMutationVariables, TContext>(
      ['MCreateReportPost'],
      (variables?: MCreateReportPostMutationVariables) => fetcher<MCreateReportPostMutation, MCreateReportPostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateReportPostDocument, variables)(),
      options
    );
export const MCreateReportCommentDocument = `
    mutation MCreateReportComment($args: CreateReportCommentInputDto!) {
  createReportComment(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateReportCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateReportCommentMutation, TError, MCreateReportCommentMutationVariables, TContext>
    ) =>
    useMutation<MCreateReportCommentMutation, TError, MCreateReportCommentMutationVariables, TContext>(
      ['MCreateReportComment'],
      (variables?: MCreateReportCommentMutationVariables) => fetcher<MCreateReportCommentMutation, MCreateReportCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateReportCommentDocument, variables)(),
      options
    );
export const MCreateReportBugDocument = `
    mutation MCreateReportBug($args: CreateReportBugInputDto!) {
  createReportBug(args: $args) {
    ok
    error
  }
}
    `;
export const useMCreateReportBugMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCreateReportBugMutation, TError, MCreateReportBugMutationVariables, TContext>
    ) =>
    useMutation<MCreateReportBugMutation, TError, MCreateReportBugMutationVariables, TContext>(
      ['MCreateReportBug'],
      (variables?: MCreateReportBugMutationVariables) => fetcher<MCreateReportBugMutation, MCreateReportBugMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCreateReportBugDocument, variables)(),
      options
    );
export const QGetMySubscribingsRequestsDocument = `
    query QGetMySubscribingsRequests {
  getMySubscribings {
    ok
    data {
      photo
      username
      id
    }
  }
  getSubscribingRequests {
    data {
      updatedAt
      id
      username
      photo
    }
  }
}
    `;
export const useQGetMySubscribingsRequestsQuery = <
      TData = QGetMySubscribingsRequestsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: QGetMySubscribingsRequestsQueryVariables,
      options?: UseQueryOptions<QGetMySubscribingsRequestsQuery, TError, TData>
    ) =>
    useQuery<QGetMySubscribingsRequestsQuery, TError, TData>(
      variables === undefined ? ['QGetMySubscribingsRequests'] : ['QGetMySubscribingsRequests', variables],
      fetcher<QGetMySubscribingsRequestsQuery, QGetMySubscribingsRequestsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetMySubscribingsRequestsDocument, variables),
      options
    );
export const QGetMySubscribersRequestsDocument = `
    query QGetMySubscribersRequests {
  getMySubscribers {
    ok
    data {
      photo
      username
      id
    }
  }
  getSubscribeRequests {
    data {
      updatedAt
      id
      username
      photo
    }
  }
}
    `;
export const useQGetMySubscribersRequestsQuery = <
      TData = QGetMySubscribersRequestsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: QGetMySubscribersRequestsQueryVariables,
      options?: UseQueryOptions<QGetMySubscribersRequestsQuery, TError, TData>
    ) =>
    useQuery<QGetMySubscribersRequestsQuery, TError, TData>(
      variables === undefined ? ['QGetMySubscribersRequests'] : ['QGetMySubscribersRequests', variables],
      fetcher<QGetMySubscribersRequestsQuery, QGetMySubscribersRequestsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetMySubscribersRequestsDocument, variables),
      options
    );
export const McancelSubscribingDocument = `
    mutation McancelSubscribing($args: CancelSubscribingInputDto!) {
  cancelSubscribing(args: $args) {
    ok
    error
  }
}
    `;
export const useMcancelSubscribingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<McancelSubscribingMutation, TError, McancelSubscribingMutationVariables, TContext>
    ) =>
    useMutation<McancelSubscribingMutation, TError, McancelSubscribingMutationVariables, TContext>(
      ['McancelSubscribing'],
      (variables?: McancelSubscribingMutationVariables) => fetcher<McancelSubscribingMutation, McancelSubscribingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, McancelSubscribingDocument, variables)(),
      options
    );
export const MRequestSubscribeDocument = `
    mutation MRequestSubscribe($args: RequestSubscribeInputDto!) {
  requestSubscribe(args: $args) {
    ok
    error
  }
}
    `;
export const useMRequestSubscribeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MRequestSubscribeMutation, TError, MRequestSubscribeMutationVariables, TContext>
    ) =>
    useMutation<MRequestSubscribeMutation, TError, MRequestSubscribeMutationVariables, TContext>(
      ['MRequestSubscribe'],
      (variables?: MRequestSubscribeMutationVariables) => fetcher<MRequestSubscribeMutation, MRequestSubscribeMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MRequestSubscribeDocument, variables)(),
      options
    );
export const MCancelSubscribingRequestDocument = `
    mutation MCancelSubscribingRequest($args: CancelSubscribeRequestInputDto!) {
  cancelSubscribingRequest(args: $args) {
    error
    ok
  }
}
    `;
export const useMCancelSubscribingRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MCancelSubscribingRequestMutation, TError, MCancelSubscribingRequestMutationVariables, TContext>
    ) =>
    useMutation<MCancelSubscribingRequestMutation, TError, MCancelSubscribingRequestMutationVariables, TContext>(
      ['MCancelSubscribingRequest'],
      (variables?: MCancelSubscribingRequestMutationVariables) => fetcher<MCancelSubscribingRequestMutation, MCancelSubscribingRequestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MCancelSubscribingRequestDocument, variables)(),
      options
    );
export const MResponseSubscribeDocument = `
    mutation MResponseSubscribe($args: ResponseSubscribeInputDto!) {
  responseSubscribe(args: $args) {
    error
    ok
  }
}
    `;
export const useMResponseSubscribeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MResponseSubscribeMutation, TError, MResponseSubscribeMutationVariables, TContext>
    ) =>
    useMutation<MResponseSubscribeMutation, TError, MResponseSubscribeMutationVariables, TContext>(
      ['MResponseSubscribe'],
      (variables?: MResponseSubscribeMutationVariables) => fetcher<MResponseSubscribeMutation, MResponseSubscribeMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MResponseSubscribeDocument, variables)(),
      options
    );
export const MChangeBlockStateDocument = `
    mutation MChangeBlockState($args: ChangeBlockStateInputDto!) {
  changeBlockState(args: $args) {
    ok
    error
  }
}
    `;
export const useMChangeBlockStateMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MChangeBlockStateMutation, TError, MChangeBlockStateMutationVariables, TContext>
    ) =>
    useMutation<MChangeBlockStateMutation, TError, MChangeBlockStateMutationVariables, TContext>(
      ['MChangeBlockState'],
      (variables?: MChangeBlockStateMutationVariables) => fetcher<MChangeBlockStateMutation, MChangeBlockStateMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MChangeBlockStateDocument, variables)(),
      options
    );
export const QGetMyBlockAndRejectDocument = `
    query QGetMyBlockAndReject {
  getMyRejectRequests {
    ok
    data {
      id
      username
      photo
    }
    error
  }
  getMyBlockingUsers {
    ok
    error
    data {
      id
      username
      photo
    }
  }
}
    `;
export const useQGetMyBlockAndRejectQuery = <
      TData = QGetMyBlockAndRejectQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: QGetMyBlockAndRejectQueryVariables,
      options?: UseQueryOptions<QGetMyBlockAndRejectQuery, TError, TData>
    ) =>
    useQuery<QGetMyBlockAndRejectQuery, TError, TData>(
      variables === undefined ? ['QGetMyBlockAndReject'] : ['QGetMyBlockAndReject', variables],
      fetcher<QGetMyBlockAndRejectQuery, QGetMyBlockAndRejectQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetMyBlockAndRejectDocument, variables),
      options
    );
export const QMeDocument = `
    query QMe {
  me {
    data {
      id
      username
      photo
      profileOpen
    }
  }
}
    `;
export const useQMeQuery = <
      TData = QMeQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: QMeQueryVariables,
      options?: UseQueryOptions<QMeQuery, TError, TData>
    ) =>
    useQuery<QMeQuery, TError, TData>(
      variables === undefined ? ['QMe'] : ['QMe', variables],
      fetcher<QMeQuery, QMeQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QMeDocument, variables),
      options
    );
export const QGetUserProfileDocument = `
    query QGetUserProfile($args: GetUserInputDto!) {
  getUserProfile(args: $args) {
    ok
    error
    data {
      id
      username
      photo
      subscribings
      subscribers
    }
    blocking
    profileOpened
    subscribeRequested
  }
}
    `;
export const useQGetUserProfileQuery = <
      TData = QGetUserProfileQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QGetUserProfileQueryVariables,
      options?: UseQueryOptions<QGetUserProfileQuery, TError, TData>
    ) =>
    useQuery<QGetUserProfileQuery, TError, TData>(
      ['QGetUserProfile', variables],
      fetcher<QGetUserProfileQuery, QGetUserProfileQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetUserProfileDocument, variables),
      options
    );
export const MEditProfileDocument = `
    mutation MEditProfile($args: EditProfileInputDto!) {
  editProfile(args: $args) {
    ok
    error
  }
}
    `;
export const useMEditProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<MEditProfileMutation, TError, MEditProfileMutationVariables, TContext>
    ) =>
    useMutation<MEditProfileMutation, TError, MEditProfileMutationVariables, TContext>(
      ['MEditProfile'],
      (variables?: MEditProfileMutationVariables) => fetcher<MEditProfileMutation, MEditProfileMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MEditProfileDocument, variables)(),
      options
    );
export const QFindUserByUsernameDocument = `
    query QFindUserByUsername($args: FindUserByUsernameInputDto!) {
  findUsersByUsername(args: $args) {
    data {
      photo
      username
      id
    }
    ok
    error
  }
}
    `;
export const useQFindUserByUsernameQuery = <
      TData = QFindUserByUsernameQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QFindUserByUsernameQueryVariables,
      options?: UseQueryOptions<QFindUserByUsernameQuery, TError, TData>
    ) =>
    useQuery<QFindUserByUsernameQuery, TError, TData>(
      ['QFindUserByUsername', variables],
      fetcher<QFindUserByUsernameQuery, QFindUserByUsernameQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QFindUserByUsernameDocument, variables),
      options
    );
export const QCheckUsernameExistDocument = `
    query QCheckUsernameExist($args: CheckUsernameExistInputDto!) {
  checkUsernameExist(args: $args) {
    ok
    error
    isExist
  }
}
    `;
export const useQCheckUsernameExistQuery = <
      TData = QCheckUsernameExistQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: QCheckUsernameExistQueryVariables,
      options?: UseQueryOptions<QCheckUsernameExistQuery, TError, TData>
    ) =>
    useQuery<QCheckUsernameExistQuery, TError, TData>(
      ['QCheckUsernameExist', variables],
      fetcher<QCheckUsernameExistQuery, QCheckUsernameExistQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QCheckUsernameExistDocument, variables),
      options
    );
export const QGetProfileOpenUserDocument = `
    query QGetProfileOpenUser {
  getProfileOpenUser {
    ok
    error
    data {
      id
      username
      photo
    }
  }
}
    `;
export const useQGetProfileOpenUserQuery = <
      TData = QGetProfileOpenUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: QGetProfileOpenUserQueryVariables,
      options?: UseQueryOptions<QGetProfileOpenUserQuery, TError, TData>
    ) =>
    useQuery<QGetProfileOpenUserQuery, TError, TData>(
      variables === undefined ? ['QGetProfileOpenUser'] : ['QGetProfileOpenUser', variables],
      fetcher<QGetProfileOpenUserQuery, QGetProfileOpenUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, QGetProfileOpenUserDocument, variables),
      options
    );