import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// import { isMobile } from 'react-device-detect';

import { isModalOpenState } from 'store';
import { theme } from 'styles/theme';
import ModalWrap from './ModalWrap';
import leftImg from 'images/left.png';

const { background } = theme;

const Container = styled.section`
  position: absolute;
  display: flex;
  left: 22px;
  top: 22px;
  height: calc(var(--vh, 1vh) * 100 - 44px);
  z-index: 2;
`;

const OpenBtn = styled.div`
  position: absolute;
  width: 44px;
  height: 100px;
  left: 412px;
  top: 454px;
  background: ${background};
  border-radius: 0px 12px 12px 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OpenImg = styled.img`
  width: 13px;
  height: 23px;
`;

const ModalContainer = () => {
  const [isModalOpen] = useRecoilState(isModalOpenState('first'));

  return (
    <>
      <Container>{isModalOpen && <ModalWrap />}</Container>
      <OpenBtn>
        <OpenImg src={leftImg} />
      </OpenBtn>
    </>
  );
};

export default ModalContainer;
