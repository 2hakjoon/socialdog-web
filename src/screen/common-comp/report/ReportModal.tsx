import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_REPORT_BUG, CREATE_REPORT_COMMENT, CREATE_REPORT_POST, CREATE_REPORT_USER } from 'apllo-gqls/report';
import { MCreateReportPost, MCreateReportPostVariables } from '__generated__/MCreateReportPost';
import { MCreateReportUser, MCreateReportUserVariables } from '__generated__/MCreateReportUser';
import { MCreateReportComment, MCreateReportCommentVariables } from '__generated__/MCreateReportComment';
import { MCreateReportBug, MCreateReportBugVariables } from '__generated__/MCreateReportBug';
import ModalBackground from '../modal/ModalBackground';
import ModalRound from '../modal/ModalRound';
import WrapperColumn from '../wrappers/WrapperColumn';
import TextBase from '../texts/TextBase';
import FormTextArea from '../input/FormTextArea';
import { useForm } from 'react-hook-form';
import DropdownSelect from '../dropdown/DropdownSelect';
import ButtonSubmit from '../button/ButtonSubmit';
import { ReportCommentsType, ReportPostsType, ReportUsersType } from '__generated__/globalTypes';
import { QMe } from '__generated__/QMe';
import { MYPROFILE } from 'apllo-gqls/users';
import useEvictCache from 'hooks/useEvictCache';

interface IReportModal {
  type: 'USER' | 'POST' | 'COMMENT' | 'BUG';
  userId?: string;
  postId?: string;
  commentId?: string;
  closeModal: () => void;
}

interface IForm {
  comment: string;
}

function ReportModal({ type, userId, postId, commentId, closeModal }: IReportModal) {
  const [createReportUser] = useMutation<MCreateReportUser, MCreateReportUserVariables>(CREATE_REPORT_USER);
  const [createReportPost] = useMutation<MCreateReportPost, MCreateReportPostVariables>(CREATE_REPORT_POST);
  const [createReportComment] = useMutation<MCreateReportComment, MCreateReportCommentVariables>(CREATE_REPORT_COMMENT);
  const [createReportBug] = useMutation<MCreateReportBug, MCreateReportBugVariables>(CREATE_REPORT_BUG);

  const [selectOption, setSelectOption] = useState<number | null>(null);
  const evictCache = useEvictCache();

  const { register, getValues, handleSubmit } = useForm();
  const optionsObj = {
    USER: [
      '지나친 홍보행위, 광고용 계정',
      '커뮤니티 가이드 위반 해위 반복',
      '부적절한 프로필 정보, 사진, 이름',
      '기타',
    ],
    POST: ['광고 행위', '욕설/비방/혐오 등 부정적인 게시물', '성적인 콘텐츠', '기타'],
    COMMENT: ['광고 행위', '욕설/비방/혐오 등 부정적인 게시물', '성적인 콘텐츠', '기타'],
    BUG: [],
  };

  const checkBeforCloseModal = () => {
    const confirm = window.confirm('작성중인 내용을 취소하고 창을 닫으시겠습니까?');
    if (confirm) closeModal(); 
  };

  const createReportHandler = async () => {
    if (type !== 'BUG' && selectOption === null) {
      window.alert('신고 유형을 선택 해주세요.');
      return;
    }
    if (!getValues('comment').length) {
      window.alert('상세 내용을 작성해주세요.');
      return;
    }
    if (type === 'USER') await createReportUserHandler();
    else if (type === 'POST') await createReportPostHandler();
    else if (type === 'COMMENT') await createReportCommenttHandler();
    else if (type === 'BUG') await createReportBugHandler();

    closeModal();
  };

  const createReportUserHandler = async () => {
    if (!userId) return;

    let reportType;

    if (selectOption === 0) reportType = ReportUsersType.ADVERTISMENT;
    else if (selectOption === 1) reportType = ReportUsersType.VIOLATION_PATTERN;
    else if (selectOption === 2) reportType = ReportUsersType.INAPPROPRIATE_PROFILE;
    else reportType = ReportUsersType.OTHER;

    const res = await createReportUser({
      variables: { args: { comment: `${getValues('comment')}`, reportType, reportedUserId: userId } },
    });
    if (res.data?.createReportUser.error) {
      window.alert(res.data?.createReportUser.error);
    } else {
      window.alert('신고가 정상적으로 접수되었습니다.');
    }
  };

  const createReportPostHandler = async () => {
    const confirm = window.confirm(
      '게시물을 신고할시, 해당 계정에선 신고한 게시물을 볼 수 없게 숨김 처리 됩니다.\n계속 하시겠습니까?',
    );
    if (!postId || !confirm) return;
    let reportType;

    if (selectOption === 0) reportType = ReportPostsType.ADVERTISMENT;
    else if (selectOption === 1) reportType = ReportPostsType.NEGATIVE_POST;
    else if (selectOption === 2) reportType = ReportPostsType.SEXUAL_CONTENTS;
    else reportType = ReportPostsType.OTHER;

    const res = await createReportPost({
      variables: { args: { comment: `${getValues('comment')}`, reportType, reportedPostId: postId } },
    });

    if (res.data?.createReportPost.error) {
      window.alert(res.data?.createReportPost.error);
    } else {
      window.alert('신고가 정상적으로 접수되었습니다.');
      evictCache(postId, 'Posts')
    }
  };

  const createReportCommenttHandler = async () => {
    if (!commentId) return;

    let reportType;

    if (selectOption === 0) reportType = ReportCommentsType.ADVERTISMENT;
    else if (selectOption === 1) reportType = ReportCommentsType.NEGATIVE_POST;
    else if (selectOption === 2) reportType = ReportCommentsType.SEXUAL_CONTENTS;
    else reportType = ReportCommentsType.OTHER;
    const res = await createReportComment({
      variables: { args: { comment: `${getValues('comment')}`, reportType, reportedCommentId: commentId } },
    });
    if (res.data?.createReportComment.error) {
      window.alert(res.data?.createReportComment.error);
    } else {
      window.alert('신고가 정상적으로 접수되었습니다.');
    }
  };

  const createReportBugHandler = async () => {
    const res = await createReportBug();
    if (res.data?.createReportBug.error) {
      window.alert(res.data?.createReportBug.error);
    } else {
      window.alert('신고가 정상적으로 접수되었습니다.');
    }
  };

  return (
    <ModalBackground closeModal={checkBeforCloseModal}>
      <ModalRound title="신고하기" closeModal={checkBeforCloseModal}>
        <WrapperColumn h="100%" w="100%" jc="space-around" p="10px 16px">
          <WrapperColumn ai="flex-start" jc="space-around" w="100%">
            {optionsObj[type].length > 0 && (
              <>
                <TextBase text={'신고 유형'} p={'10px 0'} />
                <DropdownSelect
                  options={optionsObj[type]}
                  selectOption={selectOption}
                  setSelectOption={setSelectOption}
                />
              </>
            )}
            <TextBase text={'상세 내용'} p={'10px 0'} />
            <FormTextArea register={register('comment')} />
          </WrapperColumn>
          <ButtonSubmit title="제출하기" onClick={handleSubmit(createReportHandler)} />
        </WrapperColumn>
      </ModalRound>
    </ModalBackground>
  );
}
ReportModal.defaultProps = {
  userId: '',
  postId: '',
  commentId: '',
};

export default ReportModal;
