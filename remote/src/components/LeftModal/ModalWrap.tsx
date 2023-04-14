import styled from 'styled-components';

import { theme } from 'styles/theme';

import searchImg from 'images/search.png';
import xImg from 'images/x.png';
import brandImg from 'images/brand.png';
import CardWrap from './CardWrap';

const { background, divide, head6, body4, onBackgroundCaption, bold } = theme;

const Wrap = styled.div`
  box-sizing: border-box;
  width: 390px;
  background-color: ${background};
  overflow-y: hidden;
  padding: 18px 20px;
  border-radius: 20px;
  position: relative;
  /* @media screen and (max-width: 767px) {
    width: calc(var(--vw, 1vw) * 100 - 1rem);
  } */
`;

const Search = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchImg = styled.img`
  margin-left: 8px;
  width: 28px;
  height: 28px;
`;

const XImg = styled.img`
  width: 15px;
  height: 15px;
`;

const Input = styled.input`
  border: none;
  width: 270px;
  height: 36px;
  font-size: ${head6};
  :focus {
    outline: none;
  }
`;

const Draggable = styled.div`
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${divide};
  padding: 12px 4px;
  > img + img {
    margin-left: 12px;
  }
`;

const BrandImg = styled.img`
  width: 56px;
  height: 56px;
`;

const Summary = styled.div`
  height: 60px;
  font-size: ${body4};
  line-height: 17px;
  letter-spacing: -0.02em;
  color: ${onBackgroundCaption};
  font-weight: ${bold};
  display: flex;
  align-items: center;
`;

const ModalWrap = () => {
  return (
    <Wrap>
      <Search>
        <SearchImg src={searchImg} />
        <Input type="text" placeholder="카페 이름 검색" />
        <XImg src={xImg} />
      </Search>
      <Draggable>
        {Array.from({ length: 5 }).map((_, i) => (
          <BrandImg key={i} src={brandImg} />
        ))}
      </Draggable>
      <Summary>38개의 카페</Summary>
      <CardWrap />
    </Wrap>
  );
};

export default ModalWrap;
