import { gql } from "@apollo/client";


export const CREATE_REPORT_USER = gql`
  mutation MCreateReportUser($args: CreateReportUserInputDto!) {
    createReportUser(args: $args) {
      ok
      error
    }
  }
`

export const CREATE_REPORT_POST = gql`
 mutation MCreateReportPost($args: CreateReportPostInputDto!) {
  createReportPost(args: $args) {
    ok
    error
  }
}
`

export const CREATE_REPORT_COMMENT = gql`
  mutation MCreateReportComment($args: CreateReportCommentInputDto!) {
    createReportComment(args: $args) {
      ok
      error
    }
  }
`

export const CREATE_REPORT_BUG = gql`
  mutation MCreateReportBug($args: CreateReportBugInputDto!) {
    createReportBug(args: $args) {
      ok
      error
    }
  }
`
