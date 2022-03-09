import { UserInfo } from 'os';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfilePhoto from '../image/ProfilePhoto';
import TextBase from '../texts/TextBase';
import WrapperColumn from '../wrappers/WrapperColumn';
import WrapperRow from '../wrappers/WrapperRow';

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 12px;
  justify-content: flex-start;
  width: 100%;
`;

interface IUserCardThin {
  username: string | null;
  photo: string | null;
  dogname: string | null;
}

function UserCardThin({ username, photo, dogname }: IUserCardThin) {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/${username}`)}>
      <ProfilePhoto url={photo} size="48px" />
      <WrapperColumn m={'0 16px'} jc="space-around">
        <TextBase text={username} />
        <TextBase text={dogname || ''} />
      </WrapperColumn>
    </Wrapper>
  );
}

export default UserCardThin;
