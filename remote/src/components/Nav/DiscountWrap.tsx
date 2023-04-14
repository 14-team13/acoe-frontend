import styled from 'styled-components';

import { theme } from 'styles/theme';

const { background } = theme;

const Wrap = styled.div`
  box-sizing: border-box;
  width: 554px;
  height: 320px;
  left: 437px;
  top: 84px;
  background: ${background};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  margin-top: 8px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  > div:nth-child(2n) {
    margin-left: 20px;
  }
`;

const Card = styled.div`
  width: 251px;
  height: 66px;
  background: #fafafc;
  border-radius: 12px;
`;

const DiscountWrap = () => {
  return (
    <Wrap>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>내용입니다</Card>
      ))}
    </Wrap>
  );
};

export default DiscountWrap;
