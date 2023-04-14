import styled from 'styled-components';

import { Maps } from 'components/Maps';
import {
  // Header,
  MixedBoundary,
} from 'components/Common';
import { ModalContainer } from 'components/LeftModal';
import { NavContainer } from 'components/Nav';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  width: calc(var(--vw, 1vw) * 100);
`;

const Wrap = styled.div`
  /* height: calc(var(--vh, 1vh) * 100);
  width: calc(var(--vw, 1vw) * 100); */
  height: 100%;
  widht: 100%;
`;

export const Menu = () => {
  return (
    <Container>
      {/* <Header /> */}
      <NavContainer />
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
