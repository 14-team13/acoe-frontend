import React from 'react';
import AcoeNavbar from '../pages/components/AcoeNavbar'
import AcoeFooter from '../pages/components/AcoeFooter'
import 'bootstrap/dist/css/bootstrap.css';
import { Outlet } from 'react-router-dom';

const Acoe = () => {
  return (
    <div>
      {/* NAV */}
      <div className="flex-column"><AcoeNavbar /></div>
      <div>
        <Outlet />
      </div>
      {/* Footer */}
      <div className="acoe-footer bg-light"><AcoeFooter /></div>
    </div>
  );
};

export default Acoe;