import { gql } from "@apollo/client";

export const KAKAO_LOGIN = gql`
mutation MKakaoLogin($args: KakaoLoginInputDto!) {
  kakaoLogin(args: $args) {
    ok
    error
    accessToken
    refreshToken
    acceptTerms
  }
}
`;

export const REISSUE_ACCESS_TOKEN =gql`
mutation MReissueAccessToken($args: ReissueAccessTokenInputDto!) {
  reissueAccessToken(args: $args) {
    ok
    error
    accessToken
    isRefreshTokenExpired
  }
}
`

export const UPADATE_AUTH_KAKAO_ACCECPT_TERM = gql`
mutation MUpdateAuthKakaoAcceptTerm($args: UpdateAuthKakaoAcceptTermInputDto!) {
  updateAuthKakaoAcceptTerm(args: $args) {
    ok
    error
  }
}`

export const UPDATE_AUTH_LOCAL_ACCEPT_TERM = gql`
mutation MUpdateAuthLocalAcceptTerm($args: UpdateAuthLocalAcceptTermInputDto!) {
  updateAuthLocalAcceptTerm(args: $args) {
    ok
    error
  }
}
`