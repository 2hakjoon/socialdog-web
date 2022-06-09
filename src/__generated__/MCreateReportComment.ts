/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReportCommentInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateReportComment
// ====================================================

export interface MCreateReportComment_createReportComment {
  __typename: "CreateReportCommentOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateReportComment {
  createReportComment: MCreateReportComment_createReportComment;
}

export interface MCreateReportCommentVariables {
  args: CreateReportCommentInputDto;
}
