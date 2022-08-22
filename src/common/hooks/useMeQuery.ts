import { useQuery } from "@apollo/client";
import { MYPROFILE } from "apllo-gqls/users";
import { QMe } from "__generated__/QMe";

export const useMeQuery = () => {
  const { data: meData } = useQuery<QMe>(MYPROFILE);
  const authUser = meData?.me.data;
  return authUser
}