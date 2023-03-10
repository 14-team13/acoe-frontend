import { Suspense } from 'react';
import styled from 'styled-components';

import Maps from 'components/Maps/Maps';

export const Menu = () => {
  const Div = styled.div`
    height: calc(var(--vh, 1vh) * 100 - 63px);
    width: calc(var(--vw, 1vw) * 100);
    background-color: green;
  `;
  // let MapsComponent = React.lazy(() => import('./components/Maps'));
  return (
    <Div>
      <Suspense fallback={<div>Loading...</div>}>
        <Maps />
      </Suspense>
    </Div>
  );
};
export default Menu;
