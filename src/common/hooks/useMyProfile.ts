import { useQuery } from '@apollo/client';
import { MYPROFILE } from 'apllo-gqls/users';
import { QMe } from '__generated__/QMe';

function useMyProfile() {
  const { data } = useQuery<QMe>(MYPROFILE);
  return { authUser: data?.me.data };
}

export default useMyProfile;
