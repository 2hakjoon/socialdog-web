import { useMutation } from '@apollo/client';
import { CHANGE_BLOCKSTATE } from 'apllo-gqls/subscribes';
import { MChangeBlockState, MChangeBlockStateVariables } from '__generated__/MChangeBlockState';

function useChangeBlockState() {
  return useMutation<MChangeBlockState, MChangeBlockStateVariables>(CHANGE_BLOCKSTATE);
}

export default useChangeBlockState;
