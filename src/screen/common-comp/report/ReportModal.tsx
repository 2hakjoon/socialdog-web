import React from 'react';
import { useMutation } from '@apollo/client';
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

interface IReportModal {
  type: 'USER' | 'POST' | 'COMMENT' | 'BUG';
  userId?: string;
  postId?: string;
  commnetId?: string;
  closeModal: () => void;
}

function ReportModal({ type, userId, postId, commnetId, closeModal }: IReportModal) {
  const [createReportUser] = useMutation<MCreateReportUser, MCreateReportUserVariables>(CREATE_REPORT_USER);
  const [createReportPost] = useMutation<MCreateReportPost, MCreateReportPostVariables>(CREATE_REPORT_POST);
  const [createReportComment] = useMutation<MCreateReportComment, MCreateReportCommentVariables>(CREATE_REPORT_COMMENT);
  const [createReportBug] = useMutation<MCreateReportBug, MCreateReportBugVariables>(CREATE_REPORT_BUG);

  const {register} = useForm();

  const createReportPostHandler = () => {};

  return (
    <ModalBackground closeModal={closeModal}>
      <ModalRound title='신고하기' closeModal={closeModal}>
        <WrapperColumn ai='flex-start' jc='space-around' p='20px' w='100%' h='100%'>
          <TextBase text={'신고 유형'}/>
          <TextBase text={'상세 내용'}/>
          <FormTextArea register={register}/>
        </WrapperColumn>
      </ModalRound>
    </ModalBackground>
  );
}
ReportModal.defaultProps = {
  userId: '',
  postId: '',
  commnetId: '',
};

export default ReportModal;
