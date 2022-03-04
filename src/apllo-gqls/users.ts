import { gql } from "@apollo/client";

export const USER_MYPROFILE_ALL = gql`
  query QMeAll {
    me {
      data {
        id
        username
        dogname
        photo
        subscribings
        subscribers
        loginStrategy
      }
    }
  }
`

export const GET_MYPOSTS = gql`
  query QGetMyPosts($args:GetMyPostsInputDto!) {
    getMyPosts(args:$args) {
      data {
        photos
        id
        likes
      }
    }
  }
`