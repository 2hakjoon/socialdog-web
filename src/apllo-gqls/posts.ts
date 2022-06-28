import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostData on Posts{
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
`

export const GET_SUBSCRIBING_POSTS = gql`
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
  ${POST_FRAGMENT}
`;


export const CREATE_POST = gql`
  mutation MCreatePost($args: CreatePostInputDto!) {
    createPost(args: $args) {
      ok
      error
    }
  }
`;

export const CREATE_PRESIGNED_URL = gql`
  mutation MCreatePreSignedUrls($args: CreatePreSignedUrlsInputDto!) {
    createPreSignedUrls(args: $args) {
      ok
      error
      urls
    }
  }
`;

export const TOGGLE_LIKE_POST = gql`
  mutation MToggleLikePost($args: ToggleLikePostInputDto!) {
    toggleLikePost(args: $args) {
      ok
      error
    }
  }
`

export const GET_MYPOSTS = gql`
  query QGetMyPosts($args:CursorPaginationInputDto!) {
    getMyPosts(args:$args) {
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
`

export const GET_USER_POSTS = gql`
  query QGetUserPosts($username: String!, $page: CursorPaginationInputDto!) {
    getUserPosts(args:{ username:$username }, page: $page) @connection(key: $username ) {
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
`

export const GET_POSTS_BY_ADDRESS = gql`
  query QGetPostsByAddress ($address: String!, $page: CursorPaginationInputDto!){
    getPostsByAddress(page: $page, args:{address:$address}) @connection(key: $address) {
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
  ${POST_FRAGMENT}
`

export const GET_MY_LIKED_POSTS = gql`
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
  ${POST_FRAGMENT}
`

export const EDIT_POST = gql`
  mutation MEditPost($args: EditPostInputDto!) {
    editPost(args: $args) {
      ok
      error
    }
  }
`

export const DELETE_POST = gql`
  mutation MDeletePost($args: DeletePostInputDto!) {
  deletePost(args: $args) {
    error
    ok
  }
}
`

export const GET_POST_DETAIL = gql`
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
  ${POST_FRAGMENT}
`
