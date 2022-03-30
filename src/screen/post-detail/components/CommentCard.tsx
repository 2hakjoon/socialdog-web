import { useQuery } from '@apollo/client';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import React from 'react';
import ProfilePhoto from 'screen/common-comp/image/ProfilePhoto';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { QGetComments_getComments_data } from '__generated__/QGetComments';
import { QMe } from '__generated__/QMe';

function CommentCard({ id, content, user }: QGetComments_getComments_data) {
  const { data: meData } = useQuery<QMe>(MYPROFILE);
  const authUser = meData?.me.data;

  return (
    <WrapperRow w="100%" p="8px 0px">
      <ProfilePhoto url={user.photo} size="48px" />
      <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
        <TextBase text={user.username} />
        <TextBase text={content} />
      </WrapperColumn>
      {authUser?.id === user.id && (
        <>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" color={theme.color.achromatic.black} onClick={() => {}} />
          <FontAwesomeIcon icon={faXmark} size="lg" color={theme.color.achromatic.black} onClick={() => {}} />
        </>
      )}
    </WrapperRow>
  );
}

export default CommentCard;
