import { Tabs, Tab } from 'react-bootstrap'
import MembersManagement from '@pages/components/MembersManagement'
import FranchiseManagement from '@pages/components/FranchiseManagement'
import CafesManagement from '@pages/components/CafesManagement'


const AcoeAdmin = () => {
  return (
    <Tabs
      defaultActiveKey="member"
      id="uncontrolled-tab-example"
      className="mb-3 mgt10 mg20"
    >
      <Tab eventKey="member" title="회원관리">
        <MembersManagement />
      </Tab>
      <Tab eventKey="franchise" title="프렌차이즈 관리">
        <FranchiseManagement />
      </Tab>
      <Tab eventKey="cafe" title="카페 관리">
        <CafesManagement />
      </Tab>
    </Tabs>
  );
};

export default AcoeAdmin;
