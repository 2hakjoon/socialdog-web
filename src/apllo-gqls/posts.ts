import { gql } from "@apollo/client";

const POST_FRAGMENT = gql`
  fragment PostData on PostAll{
    id
    photos
    placeId
    address
    contents
    liked
    user {
      photo
      username
      id
    }
  }
`

export const GET_SUBSCRIBING_POSTS = gql`
  query QGetSubscribingPosts($page: CorePagination!) {
    getSubscribingPosts(page: $page) {
      ok
      error
      data {
      ...PostData
      }
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
  query QGetMyPosts($args:GetMyPostsInputDto!) {
    getMyPosts(args:$args) {
      ok
      error
      data {
        photos
        id
        likes
      }
    }
  }
`

export const GET_USER_POSTS = gql`
  query QGetUserPosts($username: String!, $page: CorePagination!) {
    getUserPosts(args:{ username:$username }, page: $page) @connection(key: $username ) {
      ok
      error
      data {
        photos
        id
      }
    }
  }
`

export const GET_POSTS_BY_ADDRESS = gql`
  query QGetPostsByAddress ($args: GetPostsByAddressInputDto!, $page: CorePagination!){
    getPostsByAddress(page: $page, args: $args) {
      ok
      error
      data {
        ...PostData
      }
    }
  }
  ${POST_FRAGMENT}
`