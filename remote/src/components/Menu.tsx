import { Suspense } from 'react';
import Maps from 'components/Maps/Maps';

export const Menu = () => {
  // let MapsComponent = React.lazy(() => import('./components/Maps'));
  return (
    <div style={{ backgroundColor: 'green' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <div> 여기가 Remote </div>
        <Maps />
      </Suspense>
    </div>
  );
};
export default Menu;
