/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReportBugInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateReportBug
// ====================================================

export interface MCreateReportBug_createReportBug {
  __typename: "CreateReportBugOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateReportBug {
  createReportBug: MCreateReportBug_createReportBug;
}

export interface MCreateReportBugVariables {
  args: CreateReportBugInputDto;
}
