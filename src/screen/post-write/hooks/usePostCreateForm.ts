import { useForm } from 'react-hook-form';
import { CreatePostInputDto } from '__generated__/globalTypes';

function usePostCreateForm() {
  return useForm<CreatePostInputDto>({ mode: 'onChange' });
}

export default usePostCreateForm;
