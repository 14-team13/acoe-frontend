import React from 'react';
import Maps from './Maps/Maps'

export const Menu = () => {
  // let MapsComponent = React.lazy(() => import('./components/Maps'));
  return (
    <div style={{ backgroundColor: 'green' }}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div> 여기가 Remote </div>
        <Maps />
      </React.Suspense>
    </div>
  )
}
export default Menu;
