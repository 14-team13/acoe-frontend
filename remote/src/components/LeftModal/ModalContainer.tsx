import { useRecoilState } from 'recoil';
import { isModalOpenState } from 'store';
import styled from 'styled-components';

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

  return (
    <Container>
      {isModalOpen && (
        <ModalWrap>
          <button onClick={closeAllModal}>모달1 닫기</button>
          <p>모달1</p>
          {Array.from({ length: 100 }).map((_, i) => (
            <Card key={i} onClick={() => setIsDetailOpen(true)}>
              <p>클릭하면 모달2 나옴</p>
            </Card>
          ))}
        </ModalWrap>
      )}
      {isDetailOpen && (
        <ModalWrap>
          <button onClick={() => setIsDetailOpen(false)}>모달2 닫기</button>
          <p>모달2</p>
        </ModalWrap>
      )}
    </Container>
  );
};

export default ModalContainer;
