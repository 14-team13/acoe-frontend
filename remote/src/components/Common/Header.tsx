import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { isModalOpenState } from 'store';

const HeaderWrap = styled.div`
  height: 30px;
  padding: 5px;
  display: flex;
  vertical-align: middle;
  div + div {
    margin-left: 24px;
  }
`;

const LogoWrap = styled.div`
  margin-left: 5px;
`;

const SearchWrap = styled.div`
  input {
    height: 24px;
    width: 180px;
  }
`;

export default function Header() {
  const setIsModalOpen = useSetRecoilState(isModalOpenState('first'));

  return (
    <HeaderWrap>
      <LogoWrap>logo</LogoWrap>
      <SearchWrap>
        <input type="text" placeholder="검색어를 입력하세욘" />
      </SearchWrap>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
    </HeaderWrap>
  );
}
