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

export default function Header() {
  const setIsModalOpen = useSetRecoilState(isModalOpenState('first'));

  return (
    <HeaderWrap>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
    </HeaderWrap>
  );
}
