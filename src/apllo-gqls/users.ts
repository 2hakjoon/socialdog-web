import { gql } from "@apollo/client";

export const MYPROFILE = gql`
  query QMeAll {
    me {
      data {
        id
        username
      }
    }
  }
`

export const GET_USER_PROFILE = gql`
  query QGetUserProfile($args:GetUserInputDto!){
    getUserProfile(args: $args) {
      ok
      error
      data {
        id
        username
        dogname
        photo
        subscribings
        subscribers
      }
    }
  }
` 


export const EDIT_PROFILE = gql`
  mutation MEditProfile($args: EditProfileInputDto!) {
  editProfile(args: $args) {
    ok
    error
  }
}
`

export const FIND_USER_BY_USERNAME = gql`
  query QFindUserByUsername($args: FindUserByUsernameInputDto!){
    findUsersByUsername(args: $args) {
      data {
        photo
        username
        dogname
        id
      }
      ok
      error
    }
  }
`