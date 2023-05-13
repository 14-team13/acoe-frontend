import { Container, Pagination, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { getAdminUser, putAdminUser, deleteAdminUser } from 'api/main';
import { useState, useRef, useEffect } from 'react';


const MembersManagement = () => {

  interface Search {
    page: number | null;
    sizePerPage: number | null;
    userId?: string | null;
    username?: string | null;
    email?: string | null;
  }

  interface User{
    roleType : string | null; 
    email : string | null;
    username : string | null;
  }



  const _putAdminUser = async (item : User) => {


  }


  const _deleteAdminUser = async (item : User) => {

    
    

  }


  const [memberList, setMemberList] = useState<any>([])
  const [searchOption, setSearchOption] = useState<Search>({
    "page": 0,
    "sizePerPage": 10,
    "userId": "",
    "username": "",
    "email": ""
  });

  useEffect(() => {
    _getAdminUser(searchOption)
  }, [])


  const _getAdminUser = async (_searchOption: Search) => {
    const response = await getAdminUser(_searchOption); // type 변경 필요 
    console.log(response.data)
    if (response.data && response.data.body.user) {
      setMemberList(response.data.body.user.content)
    } else {
      setMemberList([])
    }
  }


  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>구분</th>
            <th>아이디</th>
            <th>이름</th>
            <th>랜덤닉네임</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberList && memberList.length > 0 ? memberList.map((item: any, i : number) => (
            <tr key={i}>
              <td>{item.roleType}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td></td>
              <td>
                <Button variant="warning" onClick={() => _putAdminUser(item)}>수정</Button>
                <Button variant="danger" onClick={() => _deleteAdminUser(item)}>삭제</Button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default MembersManagement;
