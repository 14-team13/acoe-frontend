import { Container, Pagination, Modal, Table, Button, Dropdown, Form } from 'react-bootstrap';
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

  interface User {
    roleType: string;
    email: string;
    username: string;
    userId : string;
  }
  interface Option {
    value: string;
    label: string;
  }

  const options: Option[] = [
    { value: '', label: '전체' },
    { value: 'email', label: '아이디' },
    { value: 'username', label: '이름' },
  ];

  const _putAdminUser = async (item: User) => {


  }


  const _deleteAdminUser = async (userId : string) => {
    let response = await deleteAdminUser(userId) 
    if (response.status === 200) {
      _getAdminUser(searchOption)
    }
  }


  const [memberList, setMemberList] = useState<any>([])
  const [searchOption, setSearchOption] = useState<Search>({
    "page": 0,
    "sizePerPage": 10,
    "userId": "",
    "username": "",
    "email": ""
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const totalPages = useRef<number>(0);
  const [showModal, setShowModal] = useState(false);
  const currrentItem = useRef<User | null>(null)

  const handleModalClose = () => {
    setShowModal(false);
  }
    const handleModalShow = (item : User) => {
    setShowModal(true);
    currrentItem.current = item
  }
  const handleModalConfirm = () => {
    _deleteAdminUser(currrentItem.current? currrentItem.current.userId : '')
    handleModalClose();
  };

  useEffect(() => {
    _getAdminUser(searchOption)
    setSelectedOption({ value: '', label: '전체' })
  }, [])


  const _getAdminUser = async (_searchOption: Search) => {
    const response = await getAdminUser(_searchOption); // type 변경 필요 
    if (response.data && response.data.body.user) {
      setMemberList(response.data.body.user.content)
      // console.log(response.data.body.user.content)
      totalPages.current = response.data.body.user.totalPages
    } else {
      setMemberList([])
    }
  }

  const renderPageItems = () => {
    const pageItems: any = [];
    pageItems.push(<Pagination.First key = {-2}onClick={() => handlePageChange(1)} />)
    pageItems.push(<Pagination.Prev key = {-1} onClick={() => handlePageChange(activePage - 1)} />)
    let _pageNumber = 1;
    if (activePage > totalPages.current - 5) {
      let startPage = totalPages.current - 10 < 1 ? 1 : totalPages.current - 10
      for (let pageNumber = startPage; pageNumber <= totalPages.current; pageNumber++) {
        pageItems.push(
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === activePage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }

    } else {
      if (activePage > 5) {
        _pageNumber = activePage - 5;
      } else {
        _pageNumber = 1;
      }

      for (let pageNumber = _pageNumber; pageNumber <= _pageNumber + 9; pageNumber++) {
        pageItems.push(
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === activePage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }
    }
    pageItems.push(<Pagination.Next key = {10000} onClick={() => handlePageChange(activePage + 1)} />)
    pageItems.push(<Pagination.Last key = {10001} onClick={() => handlePageChange(totalPages.current)} />)
    return pageItems;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber < totalPages.current + 1) {
      setActivePage(pageNumber);
      const _selectedOption = {
        "page": pageNumber - 1,
        "sizePerPage": 10,
        "username": "",
        "email": ""
      }
      _getAdminUser(_selectedOption)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };



  const search = () => {
    let _selectedOption = { "page": activePage - 1, "sizePerPage": 10,} ; 
    let _add; 
    if(selectedOption && selectedOption.value === ''){
      _add = {
        "username": inputValue,
        "email": inputValue
      }
    }else if(selectedOption && selectedOption.value === 'email'){
      _add = {
        "email": inputValue
      }
    }else if(selectedOption && selectedOption.value === 'username'){
      _add = {
        "username": inputValue,
      }
    }    
    setActivePage(1)
    _getAdminUser({..._selectedOption, ..._add})
  }

  const handleSelectedOptionChange = (value) => {
    const option = options.find((o) => o.value === value) || null;
    setSelectedOption(option);
  };


  const buttonStyle = {
    width : "100px"
  };

  return (
    <Container>
      <div className="flex-row-space mgb10">
        <div></div>
        <div className = "flex-row">
          <Dropdown onSelect={handleSelectedOptionChange}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedOption?.label || null}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {options.length > 0? options.map((option, index) => (
                  <Dropdown.Item key={index} eventKey={option.value}>
                    {option.label}
                  </Dropdown.Item>
                )) : null}
              </Dropdown.Menu>
          </Dropdown>
          <Form.Control type="text" style = {{height : "minContent"}}placeholder="Enter text" value={inputValue || ''} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === 'Enter') { search() }}}/>
          <Button variant="danger" style={buttonStyle}  onClick={() => search()}>검색</Button>
        </div>
      </div> 
      <Pagination>
        {renderPageItems()}
      </Pagination>
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
          {memberList && memberList.length > 0 ? memberList.map((item: any, i: number) => (
            <tr key={i}>
              <td>{item.roleType}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td></td>
              <td>
                <Button variant="warning mgr10" onClick={() => _putAdminUser(item)}>수정</Button>
                <Button variant="danger" onClick={() => handleModalShow(item)}>삭제</Button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to do this?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
};

export default MembersManagement;
