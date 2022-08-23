import { useMutation, useQuery } from '@apollo/client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DELETE_COMMENT } from 'apllo-gqls/comments';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import useEvictCache from 'common/hooks/useEvictCache';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhoto from 'common/components/image/ProfilePhoto';
import TextBase from 'common/components/texts/TextBase';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import TextEllipsis from 'common/components/texts/TextExpandEllipsis';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { alretError } from 'utils/alret';
import { MDeleteComment, MDeleteCommentVariables } from '__generated__/MDeleteComment';
import { QMe } from '__generated__/QMe';
import { QGetComments_getComments_data } from '__generated__/QGetComments';
import { aFewTimeAgo } from 'utils/timeformat/aFewTimeAgo';
import { QGetReComments_getReComments_data } from '__generated__/QGetReComments';
import DropdownEllipsis from 'common/components/dropdown/DropdownEllipsis';
import ReportModal from 'common/components/report/ReportModal';
import TextLink from 'common/components/texts/TextLink';
import WrapperButton from 'common/components/wrappers/WrapperButton';

interface ICommentCard extends QGetComments_getComments_data {
  authorId?: string;
  setParentComment?: () => void;
  setCommentList?: Dispatch<SetStateAction<QGetComments_getComments_data[]>>;
  setReCommentList?: Dispatch<SetStateAction<QGetReComments_getReComments_data[]>>;
}

function CommentCard({
  id,
  content,
  user,
  authorId,
  __typename,
  reCommentCounts,
  createdAt,
  updatedAt,
  setCommentList,
  setReCommentList,
  setParentComment,
}: ICommentCard) {
  const evictCache = useEvictCache();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
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
    if (setCommentList) {
      setCommentList((prev) => prev.filter((comment) => comment.id !== commentId));
    }
    if (setReCommentList) {
      setReCommentList((prev) => prev.filter((comment) => comment.id !== commentId));
    }
    evictCache(commentId, __typename);
  };

  const isDeletable = () => {
    return authUser?.id === user.id || authorId === user.id;
  };

  const moveToCommentDetail = () => {
    navigate(`${routes.commentDetailBase}${id}`);
  };

  const moveToUserProfile = (username: string) => {
    navigate(`${routes.home}${username}`);
  };

  const openReportCommentModal = () => {
    setModalOpen(true);
  };
  const closeReportCommentModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <WrapperColumn w="100%">
        <WrapperRow w="100%" p="8px 0px" ai="flex-start">
          <Link to={`${routes.home}${user.username}`}>
            <ProfilePhoto url={user.photo} size="48px" />
          </Link>
          <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
            <WrapperColumn onClick={setParentComment} ai={'flex-start'} w={'100%'}>
              <WrapperRow>
                <TextLink href={`${routes.home}${user.username}`} fontWeight={700} text={user.username} m={'4px 0px'} />
                <TextBase text={aFewTimeAgo(createdAt)} fontSize={'12px'} m="0 4px 0 8px" />
              </WrapperRow>
              <TextEllipsis line={3} fontSize="0.875rem" text={content} />
              {Boolean(reCommentCounts) && (
                <WrapperRow onClick={moveToCommentDetail} jc="center" w="100%" p="4px 0px">
                  <TextLink
                    href={`${routes.commentDetailBase}${id}`}
                    fontSize="0.75rem"
                    text={`댓글 ${reCommentCounts}개 전체보기`}
                  />
                </WrapperRow>
              )}
            </WrapperColumn>
          </WrapperColumn>
          {isDeletable() ? (
            <WrapperButton m={'0 12px'}>
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                color={theme.color.achromatic.black}
                onClick={() => {
                  deleteCommentHandler(id);
                }}
              />
            </WrapperButton>
          ) : (
            <DropdownEllipsis items={[{ itemName: '신고하기', onClick: openReportCommentModal }]} />
          )}
        </WrapperRow>
      </WrapperColumn>
      {modalOpen && <ReportModal type="COMMENT" closeModal={closeReportCommentModal} commentId={id} />}
    </>
  );
}

CommentCard.defaultProps = {
  authorId: '',
  setParentComment: () => {},
  setCommentList: () => {},
  setReCommentList: () => {},
};

export default CommentCard;
