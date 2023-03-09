import { Suspense } from 'react';
import styled from 'styled-components';

import Maps from 'components/Maps/Maps';

export const Menu = () => {
  const Div = styled.div`
    background-color: green;
  `;
  // let MapsComponent = React.lazy(() => import('./components/Maps'));
  return (
    <Div>
      <Suspense fallback={<div>Loading...</div>}>
        <div> 여기가 Remote </div>
        <Maps />
      </Suspense>
    </Div>
  );
};
export default Menu;
