import { gql } from "@apollo/client";

export const MYPROFILE = gql`
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
`

export const GET_USER_PROFILE = gql`
  query QGetUserProfile($args:GetUserInputDto!){
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
        id
      }
      ok
      error
    }
  }
`

export const CHECK_USERNAME_EXIST = gql`
  query QCheckUsernameExist($args: CheckUsernameExistInputDto!) {
    checkUsernameExist(args: $args) {
      ok
      error
      isExist
    }
  }
`

export const GET_PROFILE_OPEN_USER = gql`
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
`
