import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfilePhoto from '../image/ProfilePhoto';
import TextBase from '../texts/TextBase';
import WrapperColumn from '../wrappers/WrapperColumn';

const Wrapper = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: flex-start;
  width: 100%;
`;

interface IUserCardThin {
  id: string | null;
  username: string | null;
  photo: string | null;
  onClick?: () => void;
}

function UserCardThin({ id, username, photo, onClick = () => {} }: IUserCardThin) {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => {
        onClick();
        navigate(`/${username}`);
      }}
    >
      <ProfilePhoto url={photo} size="48px" />
      <WrapperColumn m={'0 16px'} jc="space-around" ai="flex-start">
        <TextBase text={username} />
      </WrapperColumn>
    </Wrapper>
  );
}

UserCardThin.defaultProps = {
  onClick: () => {},
};

export default UserCardThin;
