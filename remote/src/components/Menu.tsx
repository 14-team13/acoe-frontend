import styled from 'styled-components';

import Maps from 'components/Maps/Maps';
import { Header, MixedBoundary } from 'components/Common';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 63px);
  width: calc(var(--vw, 1vw) * 100);
`;

export const Menu = () => {
  return (
    <Container>
      <Header />
      <Wrap>
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </Wrap>
    </Container>
  );
};
export default Menu;
