import styled from 'styled-components';

import Maps from 'components/Maps/Maps';
import { MixedBoundary } from 'components/Common';

export const Menu = () => {
  const Div = styled.div`
    height: calc(var(--vh, 1vh) * 100 - 63px);
    width: calc(var(--vw, 1vw) * 100);
  `;
  // let MapsComponent = React.lazy(() => import('./components/Maps'));
  return (
    <Div>
      <MixedBoundary>
        <Maps />
      </MixedBoundary>
    </Div>
  );
};
export default Menu;
