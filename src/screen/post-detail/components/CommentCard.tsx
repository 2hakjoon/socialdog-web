import { useMutation, useQuery } from '@apollo/client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DELETE_COMMENT } from 'apllo-gqls/comments';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import useEvictCache from 'hooks/useEvictCache';
import React from 'react';
import ProfilePhoto from 'screen/common-comp/image/ProfilePhoto';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { alretError } from 'utils/alret';
import { MDeleteComment, MDeleteCommentVariables } from '__generated__/MDeleteComment';
import { QGetComments_getComments_data } from '__generated__/QGetComments';
import { QMe } from '__generated__/QMe';

interface ICommentCard extends QGetComments_getComments_data {
  authorId: string;
}

function CommentCard({ id, content, user, authorId, __typename }: ICommentCard) {
  const evictCache = useEvictCache();
  const { data: meData } = useQuery<QMe>(MYPROFILE);
  const authUser = meData?.me.data;

  const [deleteComment] = useMutation<MDeleteComment, MDeleteCommentVariables>(DELETE_COMMENT);

  const deleteCommentHandler = async (commentId: string) => {
    if (!window.confirm('댓글을 삭제할까요?')) {
      return;
    }
    const res = await deleteComment({ variables: { args: { id: commentId } } });
    if (!res.data?.deleteComment.ok) {
      alretError();
      return;
    }
    evictCache(commentId, __typename);
  };

  const idDeletable = () => {
    return authUser?.id === user.id || authorId === user.id;
  };

  return (
    <WrapperRow w="100%" p="8px 0px">
      <ProfilePhoto url={user.photo} size="48px" />
      <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
        <TextBase text={user.username} />
        <TextBase text={content} />
      </WrapperColumn>
      {idDeletable() && (
        <>
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            color={theme.color.achromatic.black}
            onClick={() => {
              deleteCommentHandler(id);
            }}
          />
        </>
      )}
    </WrapperRow>
  );
}

export default CommentCard;
