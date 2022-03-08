import { gql } from "@apollo/client";

export const GET_MY_SUBSCRIBINGS_REQUESTS = gql`
  query QGetMySubscribingsRequests {
    getMySubscribings {
      ok
      data {
        photo
        username
        id
        dogname
      }
    }
    getSubscribingRequests {
      data {
        updatedAt
        id
        username
        dogname
        photo
      }
    }
  }
`

export const GET_MY_SUBSCRIBERS_REQUESTS = gql`
  query QGetMySubscribersRequests {
    getMySubscribers {
      ok
      data {
        photo
        username
        id
        dogname
      }
    }
    getSubscribeRequests {
      data {
        updatedAt
        id
        username
        dogname
        photo
      }
    }
  }
`