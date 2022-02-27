import React from 'react';
import { theme } from 'assets/styles/theme';
import ImageBase from 'screen/common-comp/Image/ImageBase';
import ImageRound from 'screen/common-comp/Image/ImageRound';
import TextBase from 'screen/common-comp/Texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faLocationDot, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import WrapperEllipsis from 'screen/common-comp/wrappers/WrapperEllipsis';

const text =
  '국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다. 모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다.';

const Wrapper = styled.article`
  max-width: 612px;
  width: 100%;
  background-color: white;
`;

const TopBar = styled.div`
  width: 100%;
  height: 58px;
  border: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 0 16px;
`;

function PostCard() {
  return (
    <Wrapper>
      <TopBar>
        <ImageRound size="30px" url="https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315" />
        <TextBase text="사용자 이름" m="0 8px" />
      </TopBar>
      <WrapperSquare>
        <ImageBase url="https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315" />
      </WrapperSquare>
      <Contents>
        <WrapperRow jc="space-between" w="100%" p="8px 0">
          <WrapperRow>
            {false ? (
              <FontAwesomeIcon
                icon={faPaw}
                size="2x"
                color={theme.color.blue.primaryBlue}
                style={{ marginRight: 10 }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPaw}
                size="2x"
                color={theme.color.achromatic.darkGray}
                style={{ marginRight: 10 }}
              />
            )}
            <FontAwesomeIcon
              icon={faLocationDot}
              size="2x"
              color={theme.color.blue.primaryBlue}
              style={{ marginRight: 10 }}
            />
            <TextBase text="전라북도 전주시 덕진구 동부대로 680 (우아동3가)" />
          </WrapperRow>
          <FontAwesomeIcon icon={faEllipsisH} size="2x" color={theme.color.achromatic.black} />
        </WrapperRow>
        <WrapperEllipsis line={3}>
          <TextBase text={text} />
        </WrapperEllipsis>
      </Contents>
    </Wrapper>
  );
}

export default PostCard;
