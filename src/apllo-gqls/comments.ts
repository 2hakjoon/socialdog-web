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

export const CREAT_COMMENT = gql`
  mutation QCreateComment($args: CreateCommentInputDto!) {
  createComment(args: $args) {
    ok
    error
  }
}
`

export const EDIT_COMMENT = gql`
  mutation MEditComment($args: EditCommentInputDto!) {
    editComment(args: $args) {
      ok
      error
    }
  }
`

export const CREATE_RECOMMENT = gql`
  mutation MCreateReComment($args: CreateReCommentInputDto!) {
  createReComment(args: $args) {
    ok
    error
  }
}
`

export const GET_RECOMMENTS = gql`
  query QGetReComments($page: CursorPaginationInputDto!, $args: GetReCommentsInputDto!) {
    getReComments(page: $page, args: $args) {
      ok
      error
      data {
        ...CommentData
      }
    }
  }
  ${COMMENT_FRAGMENT}
`

export const DELETE_COMMENT = gql`
  mutation MDeleteComment($args: DeleteCommentInputDto!) {
    deleteComment(args: $args) {
      ok
      error
    }
  }
`