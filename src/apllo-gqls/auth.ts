import { gql } from "@apollo/client";

export const KAKAO_LOGIN = gql`
mutation MKakaoLogin($args: KakaoLoginInputDto!) {
  kakaoLogin(args: $args) {
    ok
    error
    accessToken
    refreshToken
    isJoin
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