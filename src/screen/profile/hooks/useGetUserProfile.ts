import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from 'apllo-gqls/users';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';

function useGetUserProfile(username: string) {
  const { data, loading: userDataLoading } = useQuery<QGetUserProfile, QGetUserProfileVariables>(GET_USER_PROFILE, {
    variables: { args: { username } },
  });
  return { user: data?.getUserProfile.data, userProfileState: data?.getUserProfile, userDataLoading };
}

export default useGetUserProfile;
