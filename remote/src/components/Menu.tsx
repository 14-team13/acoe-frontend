import styled from 'styled-components';

import { Maps } from 'components/Maps';
import { Header, MixedBoundary } from 'components/Common';
import ModalContainer from 'components/LeftModal/ModalContainer';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrap = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 40px);
  width: calc(var(--vw, 1vw) * 100);
`;

export const Menu = () => {
  return (
    <Container>
      <Header />
      <ModalContainer />
      <Wrap>
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </Wrap>
    </Container>
  );
};
export default Menu;
