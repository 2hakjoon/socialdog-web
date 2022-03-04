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
        likes
        isLiked
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