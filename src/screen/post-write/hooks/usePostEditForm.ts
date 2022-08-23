import { useForm } from 'react-hook-form';
import { EditPostInputDto } from '__generated__/globalTypes';

function usePostEditForm() {
  return useForm<EditPostInputDto>({ mode: 'onChange' });
}

export default usePostEditForm;
