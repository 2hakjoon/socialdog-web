import { gql, useApolloClient, useMutation } from '@apollo/client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CREATE_RECOMMENT, CREAT_COMMENT } from 'apllo-gqls/comments';
import { theme } from 'assets/styles/theme';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { MCreateReComment, MCreateReCommentVariables } from '__generated__/MCreateReComment';
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
  refrechComment: () => void;
  setParentComment?: Dispatch<SetStateAction<QGetComments_getComments_data | null>>;
  parentComment?: QGetComments_getComments_data | null;
  setCommentResult?: Dispatch<SetStateAction<QGetComments_getComments_data[]>>;
}

function CommentInput({ postId, refrechComment, parentComment, setParentComment, setCommentResult }: ICommnetInput) {
  const client = useApolloClient();
  const { register, getValues, setValue } = useForm();
  const [createComment] = useMutation<QCreateComment, QCreateCommentVariables>(CREAT_COMMENT);
  const [createReComment] = useMutation<MCreateReComment, MCreateReCommentVariables>(CREATE_RECOMMENT);

  const createCommentHandler = async () => {
    const content = getValues('content');
    if (!content) {
      window.alert('댓글을 입력해주세요');
      return;
    }
    if (!parentComment?.id) {
      const res = await createComment({ variables: { args: { postId, content } } });
      // console.log(res);
      if (!res.data?.createComment.ok) {
        window.alert(res.data?.createComment.error);
        return;
      }
      refrechComment();
    } else {
      const res = await createReComment({
        variables: { args: { parentCommentId: parentComment.id, postId, content } },
      });
      if (!res.data?.createReComment.ok) {
        window.alert(res.data?.createReComment.error);
        return;
      }
      const identifiedId = client.cache.identify({ id: parentComment.id, __typename: parentComment.__typename });
      client.writeFragment({
        id: identifiedId,
        fragment: gql`
          fragment RecommentCount on Comments {
            reCommentCounts
          }
        `,
        data: {
          reCommentCounts: parentComment.reCommentCounts + 1,
        },
      });
      if (!setCommentResult) {
        return;
      }
      setCommentResult((comments: QGetComments_getComments_data[]) =>
        comments.map((comment) => {
          if (comment.id === parentComment.id) {
            return { ...comment, reCommentCounts: comment.reCommentCounts + 1 };
          }
          return comment;
        }),
      );
    }

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
        <WrapperColumn w="612px" m='0 auto'>
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
          <WrapperRow w="100%">
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
  setCommentResult: () => {},
};

export default CommentInput;
