import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentData on Comments{
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
`

export const GET_COMMENTS = gql`
  query QGetComments($page: CursorPaginationInputDto!, $args: GetCommentsInputDto!) {
    getComments(page: $page, args: $args) {
      ok
      error
      data {
        ...CommentData
      }
    }
  }
  ${COMMENT_FRAGMENT}
`