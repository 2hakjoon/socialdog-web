import { gql } from "@apollo/client";

export const KAKAO_LOGIN = gql`
mutation MKakaoLogin($args: KakaoLoginInputDto!) {
  kakaoLogin(args: $args) {
    ok
    error
    accessToken
    refreshToken
  }
}
`;