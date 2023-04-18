import styled from 'styled-components';

import { theme } from 'styles/theme';
import findImg from 'images/find.svg';
import phoneImg from 'images/phone.png';
import pointImg from 'images/point.png';

const {
  background,
  divide,
  onBackground,
  onBackgroundCaption,
  thrid,
  bold,
  regular,
  head6,
  body1,
  body5,
} = theme;

const Wrap = styled.div`
  overflow-y: scroll;
  height: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 190px;
  background-color: ${background};
  border: 1px solid ${divide};
  border-radius: 20px;
  position: relative;
  & + & {
    margin-top: 16px;
  }
`;

const Span = styled.span`
  letter-spacing: -0.02em;
  color: ${onBackground};
`;

const H1 = styled(Span)`
  position: absolute;
  left: 16px;
  top: 24px;
  font-weight: ${bold};
  font-size: ${body1};
  line-height: 30px;
`;

const AddrWrap = styled.div`
  position: absolute;
  left: 16px;
  top: 58px;
  display: flex;
  align-items: center;
`;

const Addr = styled(Span)`
  font-weight: ${regular};
  font-size: ${body5};
  line-height: 18px;
`;

const AddrImg = styled.img`
  width: 14px;
  height: 14px;
  margin: 0 4px;
`;

const Nav = styled(Span)`
  font-weight: ${bold};
  font-size: ${body5};
  color: #39c848;
`;

const BotWrap = styled.div`
  position: absolute;
  top: 110px;
  left: 16px;
  width: 318px;
  height: 56px;
  display: flex;
  justify-content: space-between;
`;

const LeftWrap = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
  }
`;

const BotIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const DiscountSpan = styled.span`
  font-weight: ${bold};
  font-size: ${body5};
  color: ${onBackgroundCaption};
  letter-spacing: -0.02em;
`;

const CostSpan = styled(Span)`
  position: absolute;
  right: 16px;
  top: 117px;
  font-style: normal;
  font-weight: ${regular};
  font-size: ${body5};
  line-height: 18px;
  text-align: right;
  color: ${onBackgroundCaption};
`;

const DiscountCostSpan = styled(Span)`
  position: absolute;
  right: 16px;
  top: 135px;
  font-weight: ${bold};
  font-size: ${head6};
  line-height: 36px;
  text-align: right;
  color: ${thrid};
`;

const CardWrap = () => {
  return (
    <Wrap>
      {Array.from({ length: 100 }).map((_, i) => (
        <Card key={i}>
          <H1>투썸플레이스 연희점</H1>
          <AddrWrap>
            <Addr>서울특별시 관악구 은천로12길</Addr>
            <AddrImg src={findImg} />
            <Nav>네이버 길찾기</Nav>
          </AddrWrap>
          <BotWrap>
            <LeftWrap>
              <div>
                <BotIcon src={phoneImg} />
                <DiscountSpan>앱 주문 할인 가능</DiscountSpan>
              </div>
              <div>
                <BotIcon src={pointImg} />
                <DiscountSpan>키오스크 할인 가능</DiscountSpan>
              </div>
            </LeftWrap>
          </BotWrap>
          <CostSpan>아메리카노 S 5,000만원</CostSpan>
          <DiscountCostSpan>300원 할인</DiscountCostSpan>
        </Card>
      ))}
    </Wrap>
  );
};

export default CardWrap;
