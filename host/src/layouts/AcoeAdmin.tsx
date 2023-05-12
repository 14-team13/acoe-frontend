import { Tabs, Tab } from 'react-bootstrap'
import { useState} from 'react';
import MembersManagement from '@pages/components/MembersManagement'
import FranchiseManagement from '@pages/components/FranchiseManagement'
import CafesManagement from '@pages/components/CafesManagement'


const AcoeAdmin = () => {

  const [key, setKey] = useState('')

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
        <MembersManagement key = {key}/>
      </Tab>
      <Tab eventKey="franchise" title="프렌차이즈 관리">
        <FranchiseManagement key = {key}/>
      </Tab>
      <Tab eventKey="cafe" title="카페 관리">
        <CafesManagement key = {key}/>
      </Tab>
    </Tabs>
  );
};

export default AcoeAdmin;
