import { gql } from "@apollo/client";

export const GET_SUBSCRIBING_POSTS = gql`
  query QGetSubscribingPosts {
    getSubscribingPosts {
      ok
      error
      data {
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
    }
  }
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