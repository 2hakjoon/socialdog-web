import { useMutation } from '@apollo/client';
import { CREAT_COMMENT } from 'apllo-gqls/comments';
import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { QCreateComment, QCreateCommentVariables } from '__generated__/QCreateComment';

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

interface ICommnetInput {
  postId: string;
  addComment: (content: string) => void;
}

function CommentInput({ postId, addComment }: ICommnetInput) {
  const { register, getValues, setValue } = useForm();
  const [createComment] = useMutation<QCreateComment, QCreateCommentVariables>(CREAT_COMMENT);

  const createCommentHandler = async () => {
    const res = await createComment({ variables: { args: { postId, content: getValues('content') } } });
    // console.log(res);
    if (!res.data?.createComment.ok) {
      alert(res.data?.createComment.error);
      return;
    }
    addComment(getValues('content'));
    setValue('content', '');
  };

  return (
    <>
      <Block />
      <Wrapper>
        <WrapperRow>
          <FormTextArea register={register('content')} height={'30px'} minHeight={'30px'} />
          <ButtonSmallBlue title="작성" onClick={createCommentHandler} />
        </WrapperRow>
      </Wrapper>
    </>
  );
}

export default CommentInput;
