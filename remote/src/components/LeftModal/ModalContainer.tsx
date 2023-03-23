import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { isModalOpenState } from 'store';

const Container = styled.section`
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  z-index: 2;
  display: flex;
  // TODO remove
  > div + div {
    background-color: paleturquoise;
  }
`;

const ModalWrap = styled.div`
  width: 377px;
  height: 100%;
  background-color: skyblue;
  padding: 0.5rem;
  overflow-y: auto;
  @media screen and (max-width: 767px) {
    width: calc(var(--vw, 1vw) * 100 - 1rem);
  }
`;

const Card = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: palegoldenrod;
  & + & {
    margin-top: 0.5rem;
  }
  //TODO remove
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isModalOpenState('first'),
  );
  const [isDetailOpen, setIsDetailOpen] = useRecoilState(
    isModalOpenState('second'),
  );

  const closeAllModal = () => {
    setIsModalOpen(false);
    isDetailOpen && setIsDetailOpen(false);
  };

  const toggleDetail = () => {
    setIsDetailOpen(prev => !prev);
    isMobile && setIsModalOpen(prev => !prev);
  };

  return (
    <Container>
      {isModalOpen && (
        <ModalWrap>
          <button onClick={closeAllModal}>모달1 닫기</button>
          <p>모달1</p>
          {Array.from({ length: 100 }).map((_, i) => (
            <Card key={i} onClick={toggleDetail}>
              <p>클릭하면 모달2 나옴</p>
            </Card>
          ))}
        </ModalWrap>
      )}
      {isDetailOpen && (
        <ModalWrap>
          <button onClick={toggleDetail}>모달2 닫기</button>
          <p>모달2</p>
        </ModalWrap>
      )}
    </Container>
  );
};

export default ModalContainer;
