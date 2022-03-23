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

export const CANCEL_SUBSCRIBE = gql`
mutation McancelSubscribing($args: CancelSubscribingInputDto!) {
  cancelSubscribing(args: $args) {
    ok
    error
  }
}`

export const REQUEST_SUBSCRIBE = gql`
  mutation MRequestSubscribe($args: RequestSubscribeInputDto!) {
  requestSubscribe(args: $args) {
    ok
    error
  }
}
`

export const CANCEL_SUBSCRIBE_REQUEST = gql`
  mutation MCancelSubscribingRequest($args: CancelSubscribeRequestInputDto!) {
  cancelSubscribingRequest(args: $args) {
    error
    ok
  }
}
`

export const RESPONSE_SUBSCRIBE = gql`
  mutation MResponseSubscribe($args: ResponseSubscribeInputDto!) {
  responseSubscribe(args: $args) {
    error
    ok
  }
}
`

export const CHANGE_BLOCKSTATE = gql`
  mutation MChangeBlockState($args: ChangeBlockStateInputDto!) {
  changeBlockState(args: $args) {
    ok
    error
  }
}
`

export const GET_BLOCK_REJECTED = gql`
query QGetMyBlockAndReject{
  getMyRejectRequests {
    ok
    data {
      id
      username
      photo
      dogname
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
      dogname
    }
}
  }`