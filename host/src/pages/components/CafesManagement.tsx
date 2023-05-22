import { Container, Pagination, Row, Col, Table, Button, FormControl, Form , Dropdown,  } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { getAdminFranchisesList, getAdminCafeList, getAdminCafeInfo, postAdminCafeInfo, putAdminCafeInfo } from 'api/main';
import * as formik from 'formik';
import * as yup from 'yup';

const CafesManagement = (props: any) => {

  interface Option {
    value: string;
    label: string;
  }

  interface franchise {
    rmk?: string;
    franchiseId: number;
    franchiseNm: string;
    discountAmt: number;
    logoImg?: string;
    useYn: boolean;
    menuList?: any; // 수정필요
    src: string;
  }
  interface Search {
    page: number | null;
    sizePerPage: number | null;
    cafeNm?: string | null;
    roadAddr?: string | null;
    discountAmt?: number | null;
    menuYn?: boolean | null;
  }

  const options: Option[] = [
    { value: '', label: '전체' },
    { value: 'cafeNm', label: '카페명' },
    { value: 'roadAddr', label: '주소' },
    { value: 'discountAmt', label: '텀블러할인 금액' },
  ];

  const _getAdminCafeList = async (_searchOption: Search) => {
    const response = await getAdminCafeList(_searchOption); // type 변경 필요 
    if (response.data) {
      setCafeList(response.data.content)
      totalPages.current = response.data.totalPages
    } else {
      setCafeList([])
    }
  }


  const _getAdminCafeInfo = async (type: string, cafeId: number) => {
    if (type === 'UDP') {
      const response = await getAdminCafeInfo(cafeId); // type 변경 필요 
      if (response.data && type === 'UDP') {
        if(response.data.franchise){ // 프랜차이즈면 
          setShowFranchise(true);
          setFranchiseValue(response.data.franchise.franchiseNm)
        }else{ // 프랜차이즈가 아니면
          setShowFranchise(false); 
          setFranchiseValue("해당없음")
          for (let i = 0; i < 5; i++) {
            if (response.data.menuList[i] && response.data.menuList[i].regDttm) {
              let item = response.data.menuList[i];
              response.data.menuList[i] = { 'menuId' : item.menuId, 'menuNm': item.menuNm, 'price': item.price }
            } else {
              response.data.menuList[i] = { 'menuNm': '', 'price': '' }
            }
          }        
        }
        response.data.menuList.forEach((item) => {
          if(item.appOrderYn === null) item.appOrderYn = false;
          if(item.kioskYn === null) item.kioskYn = false;
          if(item.useYn === null) item.appOrderYn = false;
        })
        setFormData({ ...response.data, type: 'UPD' })
      }
    } else {
      setShowFranchise(false);
      setFranchiseValue("해당없음")
      setFormData({
        cafeNm: '',
        roadAddr: '',
        discountAmt: 0,
        menuList: [
          { 'menuNm': '', 'price': 0 },
          { 'menuNm': '', 'price': 0 },
          { 'menuNm': '', 'price': 0 },
          { 'menuNm': '', 'price': 0 },
          { 'menuNm': '', 'price': 0 }
        ],
        appOrderYn: false,
        kioskYn: false,
        useYn: false,
        X: 0,
        Y: 0,
        type: 'INS'
      })
    }
  }

  const _getAdminFranchisesList = async () => {
    const response = await getAdminFranchisesList(); // type 변경 필요 
    if (response.data.length > 0) {
      const newObj = {'franchiseId' : null, 'franchiseNm' : '해당없음'}
      response.data.unshift(newObj);
      setFranchisesData(response.data)
    } else {
      setFranchisesData([])
    }
  }
   
  const { Formik } = formik;

  const [inputValue, setInputValue] = useState('');
  const [cafeList, setCafeList] = useState<any>([])
  const [searchOption, setSearchOption] = useState<Search>({
    "page": 0,
    "sizePerPage": 10
  });
  const [franchiseData, setFranchisesData] = useState<franchise[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [cafeMngAdminMain, setCafeMngAdminMain] = useState(true);
  const [formData, setFormData] = useState<any>(null)
  const [activePage, setActivePage] = useState(1);
  const totalPages = useRef<number>(0);
  const [franchiseValue, setFranchiseValue] = useState('');
  const [showFranchise, setShowFranchise] = useState(false);


  useEffect(() => {
    if (cafeMngAdminMain) {
      _getAdminCafeList(searchOption)
      setSelectedOption({ value: '', label: '전체' })
    }
  }, [cafeMngAdminMain])


  useEffect(() => {
    if (props.key === 'cafe') {
      setCafeMngAdminMain(true)
    }
  }, [props.key])



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectedOptionChange = (value) => {
    const option = options.find((o) => o.value === value) || null;
    setSelectedOption(option);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(showFranchise){
      delete formData.menuList;
    }else{
      delete formData.franchise;
    }
    if (formData.type === 'INS') {
      let response = await postAdminCafeInfo(JSON.parse(JSON.stringify(formData)));
      if (response.status === 200) {
        setCafeMngAdminMain(true)
        setActivePage(1)
      }
    } else {
      let response = await putAdminCafeInfo(JSON.parse(JSON.stringify(formData)), formData.cafeId);
      if (response.status === 200) {
        setCafeMngAdminMain(true)
        setActivePage(1)
      }
    }
  };

  const handleInsUpd = (item: any, type: string) => {
    setCafeMngAdminMain(false);
    _getAdminCafeInfo(type, item.cafeId)
    _getAdminFranchisesList();
  }


  const search = () => {
    let _selectedOption = { "page": 0, "sizePerPage": 10,} ; 
    let _add; 
    if(selectedOption && selectedOption.value === 'cafeNm'){
      _add = {
        "cafeNm": inputValue,
      }
    }else if(selectedOption && selectedOption.value === 'roadAddr'){
      _add = {
        "roadAddr": inputValue
      }
    }else if(selectedOption && selectedOption.value === 'discountAmt'){
      _add = {
        "discountAmt": inputValue,
      }
    }    
    setActivePage(1)
    _getAdminCafeList({..._selectedOption, ..._add})
  }



  const schema = yup.object().shape({
    cafeNm: yup.string().required(),
    roadAddr: yup.string().required(),
    discountAmt: yup.string().required()
  });

  const renderPageItems = () => {
    const pageItems: any = [];
    pageItems.push(<Pagination.First key = {-2} onClick={() => handlePageChange(1)} />)
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
        "sizePerPage": 10
      }
      _getAdminCafeList(_selectedOption)
    }
  }

  const handleDropdownChange = (value) => {
    value !== "해당없음"? setShowFranchise(true) : setShowFranchise(false)
    setFranchiseValue(value);
    const selectedOption = franchiseData.find((option) => option.franchiseNm === value )
    setFormData((prevFormData) => ({
      ...prevFormData,
      ['franchiseId']: selectedOption?.franchiseId
    }));
  };

  const buttonStyle = {
    width : "100px"
  };


  return (
    <Container style={{ overflowY: "auto" }}>
      {cafeMngAdminMain ?
        <div>
          <div className="flex-row-space mgb10">
            <Button variant="secondary" onClick={() => handleInsUpd({}, 'INS')}>등록</Button>
            <div className="flex-row">
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
          <Form.Control type="text" placeholder="Enter text" value={inputValue || ''} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === 'Enter') { search() }}}/>
          <Button variant="danger"  style={buttonStyle} onClick={() => search()}>검색</Button>
            </div>
          </div>
          <Pagination>
            {renderPageItems()}
          </Pagination>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>카페명</th>
                <th>주소</th>
                <th>프렌차이즈 여부</th>
                <th>텀블러 할인금액</th>
                <th>앱주문</th>
                <th>키오스크 할인</th>
                <th>사용여부</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cafeList && cafeList.length > 0 ? cafeList.map((item: any, i) => (
                <tr key={i}>
                  <td>{item.cafeNm}</td>
                  <td>{item.roadAddr}</td>
                  <td>{item.franchise ? 'Y' : 'N'}</td>
                  <td>{item.discountAmt}</td>
                  <td>{item.appOrderYn ? 'Y' : 'N'}</td>
                  <td>{item.kioskYn ? 'Y' : 'N'}</td>
                  <td>{item.useYn ? 'Y' : 'N'}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleInsUpd(item, 'UDP')}>
                      수정
                    </Button>
                  </td>
                </tr>
              )) : null}
            </tbody>
          </Table>
        </div> : null }
        {!cafeMngAdminMain ? 
        <div>
          <Formik
            initialValues={formData}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <Form.Label>카페 명</Form.Label>
                    <Form.Control
                      type="text"
                      name="cafeNm"
                      value={formData && formData.cafeNm || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: event.target.value,
                        }));
                      }}
                      isValid={formData && formData.cafeNm !== ''}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>주소</Form.Label>
                    <Form.Control
                      type="text"
                      name="roadAddr"
                      value={formData && formData.roadAddr || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: event.target.value,
                        }));
                      }}
                      isValid={formData && formData.roadAddr !== ''}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>할인금액</Form.Label>
                    <Form.Control
                      type="number"
                      name="discountAmt"
                      value={formData && formData.discountAmt || 0}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: parseInt(event.target.value),
                        }));
                      }}
                    />
                  </Form.Group>
                </Row>
                {!showFranchise && formData && formData.menuList && formData.menuList.map((item, i) => (
                  <Row className="mb-6" key={i}>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId={i + "formikVal_menu"}
                      className="position-relative"
                    >
                      <Form.Label>메뉴{i + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        name="menuNm"
                        value={formData.menuList[i].menuNm || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            ['menuList']:
                              prevFormData.menuList.map((item, listIndex) => {
                                if (i === listIndex) {
                                  return {
                                    ...item,
                                    [event.target.name]: event.target.value
                                  };
                                } else {
                                  return item;
                                }
                              })
                          }));
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId={i + "formikVal_price"}
                      className="position-relative"
                    >
                      <Form.Label>금액 {i + 1}</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.menuList[i].price || 0}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            ['menuList']:
                              prevFormData.menuList.map((item, listIndex) => {
                                if (i === listIndex) {
                                  return {
                                    ...item,
                                    [event.target.name]: parseInt(event.target.value),
                                  };
                                } else {
                                  return item;
                                }
                              })
                          }));
                        }}
                      />
                    </Form.Group>
                  </Row>
                ))}
                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>X좌표</Form.Label>
                    <Form.Control
                      type="number"
                      name="x"
                      value={formData && formData.x || 0}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: parseInt(event.target.value),
                        }));
                      }}
                      isValid={formData && formData.x !== 0}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik105"
                    className="position-relative"
                  >
                    <Form.Label>Y좌표</Form.Label>
                    <Form.Control
                      type="number"
                      name="y"
                      value={formData && formData.y || 0}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: parseInt(event.target.value),
                        }));
                      }}
                      isValid={formData && formData.y !== 0}
                    />
                  </Form.Group>
                </Row> 
                <Row className="flex-row ">
                  <Form.Group>
                    <Form.Label>프랜차이즈 선택</Form.Label>
                  </Form.Group>
                  <Form.Group>
                  <Dropdown onSelect={handleDropdownChange}>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {franchiseValue || '해당없음'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {franchiseData.length > 0? franchiseData.map((option, index) => (
                          <Dropdown.Item key={index} eventKey={option.franchiseNm}>
                            {option.franchiseNm}
                          </Dropdown.Item>
                        )) : null}
                      </Dropdown.Menu>
                    </Dropdown>
                    </Form.Group>
                </Row>
                <Form.Group className="position-relative mb-3">
                  <Form.Check
                    required
                    name="appOrderYn"
                    label="앱 주문"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        [event.target.name]: event.target.checked,
                      }));
                    }}
                    checked={formData && formData.appOrderYn}
                    id="validationFormik6"
                  />
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Check
                    required
                    name="kioskYn"
                    label="키오스크할인"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        [event.target.name]: event.target.checked,
                      }));
                    }}
                    checked={formData && formData.kioskYn}
                    id="validationFormik7"
                  />
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Check
                    required
                    name="useYn"
                    label="사용여부"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        [event.target.name]: event.target.checked,
                      }));
                    }}
                    checked={formData && formData.useYn}
                    id="validationFormik8"
                  />
                </Form.Group>
                <Button id = "submit2" type="submit">저장하기</Button>
                <Button variant="danger" onClick={() => 
                  setCafeMngAdminMain(true)
                  }>카페 리스트보기</Button>
              </Form>
            )}
          </Formik>
        </div>:  null}
    </Container>
  );
};

export default CafesManagement;
