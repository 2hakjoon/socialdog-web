/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReportUserInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MCreateReportUser
// ====================================================

export interface MCreateReportUser_createReportUser {
  __typename: "CreateReportUserOutputDto";
  ok: boolean;
  error: string | null;
}

export interface MCreateReportUser {
  createReportUser: MCreateReportUser_createReportUser;
}

export interface MCreateReportUserVariables {
  args: CreateReportUserInputDto;
}
