import { Tabs, Tab, Pagination } from 'react-bootstrap'
import { useState } from 'react';
import MembersManagement from '@pages/components/MembersManagement'
import FranchiseManagement from '@pages/components/FranchiseManagement'
import CafesManagement from '@pages/components/CafesManagement'


const AcoeAdmin = () => {

  const [key, setKey] = useState('member')

  const handleSelect = (key) => {
    setKey(key)
  }

  return (
    <Tabs
      onSelect={handleSelect}
      defaultActiveKey="member"
      id="uncontrolled-tab-example"
      className="mb-3 mgt10 mg20"
    >
      <Tab eventKey="member" title="회원관리">
        {key === 'member' ? <MembersManagement key={key} /> : null}
      </Tab>
      <Tab eventKey="franchise" title="프렌차이즈 관리">
        {key === 'franchise' ? <FranchiseManagement key={key} /> : null}
      </Tab>
      <Tab eventKey="cafe" title="카페 관리">
        {key === 'cafe' ? <CafesManagement key={key} /> : null}
      </Tab>
    </Tabs>
  );
};

export default AcoeAdmin;
