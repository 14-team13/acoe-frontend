import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { getAdminFranchisesList, getAdminFranchiseInfo, postAdminFranchise, putAdminFranchise } from 'api/main';
import { useState, useRef, useEffect } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Base64 } from 'js-base64';

const FranchiseManagement = (props) => {

  interface cafe {
    rmk?: string;
    franchiseId: number;
    franchiseNm: string;
    discountAmt: number;
    logoImg?: string;
    useYn: boolean;
    menuList?: any; // 수정필요
    src: string;
  }

  interface menu {
    menuNm: string;
    price: number;
  }

  interface file {
    myFile: string | null;
  }


  const [franchiseData, setFranchisesData] = useState<cafe[]>([]);
  const [franchiseAdminMain, setFranchiseAdminMain] = useState(true);
  const [currentData, setCurrentData] = useState<cafe | null>(null);
  const [franchiseInfo, setFranchiseInfo] = useState<cafe[]>([]);
  const [formData, setFormData] = useState<any>({}); // 수정필요
  const [postImage, setPostImage] = useState<file | object>({ myFile: "" });

  const _getAdminFranchisesList = async () => {
    const response = await getAdminFranchisesList(); // type 변경 필요 
    if (response.data.length > 0) {
      setFranchisesData(response.data)
    } else {
      setFranchisesData([])
    }
  }

  const _getAdminFranchiseInfo = async (cafeId: number) => {
    const response = await getAdminFranchiseInfo(cafeId); // type 변경 필요 

    if (response.data) {
      for (let i = 0; i < 3; i++) {
        if (response.data.menuList[i] && response.data.menuList[i].menuNm) {
          let item = response.data.menuList[i];
          response.data.menuList[i] = { '_id': i, 'menuId': item.menuId, 'menuNm': item.menuNm, 'price': item.price }
        } else {
          response.data.menuList[i] = { '_id': i, 'menuNm': '', 'price': '' }
        }
      }
      setFormData(response.data)
    } else {
      setFormData({})
    }
  }

  useEffect(() => {
    if (franchiseAdminMain) {
      _getAdminFranchisesList();
    } else {
      _getAdminFranchiseInfo(currentData ? currentData.franchiseId : 0);
    }
  }, [franchiseAdminMain, currentData])

  useEffect(() => {
    if (props.key === 'franchise') {
      setFranchiseAdminMain(true);
    }
  }, [props.key])

  const { Formik } = formik;

  const schema = yup.object().shape({
    franchiseId: yup.string().required(),
    discountAmt: yup.string().required(),
    username: yup.string().required(),
    logoImg: yup.mixed().required(),
    useYn: yup.bool().required().oneOf([true], 'terms must be accepted'),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await putAdminFranchise(JSON.parse(JSON.stringify(formData)), formData.franchiseId)
    if (response.status === 200) {
      setFranchiseAdminMain(true)
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      if (base64) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ['logoImg']: base64.toString().split(',')[1],
        }));
        setPostImage({ ...postImage, myFile: base64 });
      }
    }
  };


  return (
    <Container>
      {franchiseAdminMain ?
        <Row>
          {franchiseData.map((data) => (
            <Col md={4} key={data.franchiseId}>
              <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={`data:image/jpg;base64,${data.logoImg}`} alt="base64-encoded image"  />
                <Card.Body onClick={() => setCurrentData(data)}>
                  <Card.Title>{data.franchiseNm}</Card.Title>
                  <Card.Text>할인금액 : {data.discountAmt}</Card.Text>
                  <Card.Text>사용여부 : {data.useYn}</Card.Text>
                  <Button variant="primary" onClick={() => setFranchiseAdminMain(false)}>수정</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> :
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
                    <Form.Label>프렌차이즈 명</Form.Label>
                    <Form.Control
                      type="text"
                      name="franchiseNm"
                      value={formData.franchiseNm || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: event.target.value,
                        }));
                      }}
                      isValid={formData && formData.franchiseNm !== ''}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>할인금액</Form.Label>
                    <Form.Control
                      type="number"
                      name="discountAmt"
                      value={formData.discountAmt || 0}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [event.target.name]: parseInt(event.target.value),
                        }));
                      }}
                      isValid={formData && formData.discountAmt !== 0}
                    />
                  </Form.Group>
                </Row>
                {formData && formData.menuList && formData.menuList.map((item, i) => (
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
                <Row>
                  <Form.Group className="position-relative mb-3">
                    <Form.Label>로고</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      accept=".jpg"
                      name="logoImg"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
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
                  />
                </Form.Group>
                <Button type="submit">저장하기</Button>
                <Button variant="danger" onClick={() => setFranchiseAdminMain(true)}>카페 리스트보기</Button>
              </Form>
            )}
          </Formik>
        </div>
      }
    </Container>
  );
};

export default FranchiseManagement;
