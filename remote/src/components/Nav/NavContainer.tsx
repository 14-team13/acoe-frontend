import styled from 'styled-components';

import { theme } from 'styles/theme';
import { Button } from 'styles/common';
import starbucksImg from 'images/starbucks.png';
import lowImg from 'images/low.png';
import mediumImg from 'images/medium.png';
import highImg from 'images/high.png';

const { bold, body1 } = theme;

const Wrap = styled.div`
  position: absolute;
  top: 22px;
  left: 22px;
  width: calc(100% - 22px);
  z-index: 2;
  box-sizing: border-box;
  display: flex;
`;

const Search = styled.div`
  width: 390px;
  margin-right: 24px;
`;

const NavBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const DiscountWrap = styled.div`
  display: flex;
  flex-direction: row;
  > div + div {
    margin-left: 12px;
  }
`;

const Discount = styled(Button)`
  display: flex;
  align-items: center;
  > img + span {
    margin-left: 8px;
    font-weight: ${bold};
    font-size: ${body1};
    line-height: 30px;
    letter-spacing: -0.02em;
  }
`;

const NavContainer = () => {
  return (
    <Wrap>
      <Search></Search>
      <NavBox>
        <DiscountWrap>
          <Discount on>
            <img src={starbucksImg} />
            <span>프렌차이즈 할인</span>
          </Discount>
          <Discount>
            <img src={lowImg} />
            <span>300원 이상~</span>
          </Discount>
          <Discount>
            <img src={mediumImg} />
            <span>500원 이상~</span>
          </Discount>
          <Discount>
            <img src={highImg} />
            <span>1,000원 이상~</span>
          </Discount>
        </DiscountWrap>
      </NavBox>
    </Wrap>
  );
};

export default NavContainer;
