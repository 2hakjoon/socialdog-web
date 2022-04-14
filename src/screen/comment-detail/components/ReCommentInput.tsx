import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { CREATE_RECOMMENT } from 'apllo-gqls/comments';
import { useForm } from 'react-hook-form';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { MCreateReComment, MCreateReCommentVariables } from '__generated__/MCreateReComment';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border-top: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 16px 8px;
  button {
    margin-left: 10px;
  }
`;

const Block = styled.div`
  height: 100px;
`;

interface IReCommentInput {
  postId: string;
  refrechComment: () => void;
  parentCommentId: string;
}

function ReCommentInput({ postId, refrechComment, parentCommentId }: IReCommentInput) {
  const { register, getValues, setValue } = useForm();
  const [createReComment] = useMutation<MCreateReComment, MCreateReCommentVariables>(CREATE_RECOMMENT);

  const createCommentHandler = async () => {
    const content = getValues('content');
    if (!content) {
      window.alert('댓글을 입력해주세요');
      return;
    }
    const res = await createReComment({ variables: { args: { parentCommentId, postId, content } } });
    // console.log(res);
    if (!res.data?.createReComment.ok) {
      window.alert(res.data?.createReComment.error);
      return;
    }
    refrechComment();
    setValue('content', '');
  };

  return (
    <>
      <Block />
      <Wrapper>
        <WrapperColumn w="100%">
          <WrapperRow w="100%">
            <FormTextArea register={register('content')} height={'30px'} minHeight={'30px'} />
            <ButtonSmallBlue title="작성" onClick={createCommentHandler} />
          </WrapperRow>
        </WrapperColumn>
      </Wrapper>
    </>
  );
}

export default ReCommentInput;
