import { useMutation } from "@apollo/client";
import { KAKAO_LOGIN } from "apllo-gqls/auth";
import { MKakaoLogin, MKakaoLoginVariables } from "__generated__/MKakaoLogin";

function useKakaoLogin() {
  return useMutation<MKakaoLogin, MKakaoLoginVariables>(KAKAO_LOGIN);
}

export default useKakaoLogin;
