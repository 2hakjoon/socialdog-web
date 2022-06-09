/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReportPostInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateReportPost
// ====================================================

export interface MCreateReportPost_createReportPost {
  __typename: "CreateReportPostOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateReportPost {
  createReportPost: MCreateReportPost_createReportPost;
}

export interface MCreateReportPostVariables {
  args: CreateReportPostInputDto;
}
