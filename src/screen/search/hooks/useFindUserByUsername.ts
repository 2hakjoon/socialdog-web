import { useLazyQuery } from '@apollo/client';
import { FIND_USER_BY_USERNAME } from 'apllo-gqls/users';
import { QFindUserByUsername, QFindUserByUsernameVariables } from '__generated__/QFindUserByUsername';

function useFindUserByUsername() {
  const [findUserByUsername, { data: findUserData, loading: findUserLoading }] = useLazyQuery<
    QFindUserByUsername,
    QFindUserByUsernameVariables
  >(FIND_USER_BY_USERNAME);
  return { findUserByUsername, findUserData, findUserLoading };
}

export default useFindUserByUsername;
