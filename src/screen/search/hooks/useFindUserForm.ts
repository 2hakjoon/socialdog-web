import { useForm } from 'react-hook-form';
import { FindUserByUsernameInputDto } from '__generated__/globalTypes';

function useFindUserForm() {
  return useForm<FindUserByUsernameInputDto>();
}

export default useFindUserForm;
