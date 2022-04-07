import { useMutation } from '@apollo/client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CREAT_COMMENT } from 'apllo-gqls/comments';
import { theme } from 'assets/styles/theme';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { QCreateComment, QCreateCommentVariables } from '__generated__/QCreateComment';
import { QGetComments_getComments_data } from '__generated__/QGetComments';

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
  setParentComment?: Dispatch<SetStateAction<QGetComments_getComments_data | null | undefined>>;
  parentComment?: QGetComments_getComments_data | null;
}

function CommentInput({ postId, addComment, parentComment, setParentComment }: ICommnetInput) {
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

  const resetParentComment = () => {
    if (!setParentComment) {
      return;
    }
    setParentComment(null);
  };

  return (
    <>
      <Block />
      <Wrapper>
        <WrapperColumn w="100%">
          <WrapperRow w="100%">
            {parentComment?.user.username && (
              <>
                <TextBase text={`${parentComment.user.username}에게 답글쓰는중`} />
                <FontAwesomeIcon
                  icon={faXmark}
                  size="lg"
                  color={theme.color.achromatic.black}
                  onClick={() => {
                    resetParentComment();
                  }}
                />
              </>
            )}
          </WrapperRow>
          <WrapperRow>
            <FormTextArea register={register('content')} height={'30px'} minHeight={'30px'} />
            <ButtonSmallBlue title="작성" onClick={createCommentHandler} />
          </WrapperRow>
        </WrapperColumn>
      </Wrapper>
    </>
  );
}
CommentInput.defaultProps = {
  setParentComment: () => {},
  parentComment: null,
};

export default CommentInput;
