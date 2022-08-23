import { useQuery } from '@apollo/client';
import { GET_PROFILE_OPEN_USER } from 'apllo-gqls/users';
import { QGetProfileOpenUser } from '__generated__/QGetProfileOpenUser';

function useGetProfileOpenUser() {
  const { data, loading: profileOpenUserLoading } = useQuery<QGetProfileOpenUser>(GET_PROFILE_OPEN_USER);

  return { profileOpenUsers: data?.getProfileOpenUser.data, profileOpenUserLoading };
}

export default useGetProfileOpenUser;
