import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { getAdminFranchisesList, getAdminFranchiseInfo, postAdminFranchise, putAdminFranchise} from 'api/main';
import { useState, useRef, useEffect } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Base64 } from 'js-base64';

const FranchiseManagement = () => {

  interface cafe {
    rmk?: string;
    regrId: number;
    regDttm: string;
    modrId: number;
    modDttm: string;
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

  type menuType = {};
  type menuList = [];

  const [franchiseData, setFranchisesData] = useState<cafe[]>([]);
  const [franchiseAdminMain, setFranchiseAdminMain] = useState(true);
  const [currentData, setCurrentData] = useState<cafe | null>(null);
  const [franchiseInfo, setFranchiseInfo] = useState<cafe[]>([]);
  const [formData, setFormData] = useState<any>({}); // 수정필요
  const [fileData, setFileData] = useState<string | null>(null);


  const _getAdminFranchisesList = async () => {
    const response = await getAdminFranchisesList(); // type 변경 필요 
    if (response.data.length > 0) {
      setFranchisesData(response.data)
      console.log(response.data)
    } else {
      setFranchisesData([])
    }
  }

  const _getAdminFranchiseInfo = async (cafeId: number) => {
    const response = await getAdminFranchiseInfo(cafeId); // type 변경 필요 

    if (response.data) {
      console.log(response.data)
      for (let i = 0; i < 3; i++) {
        if (response.data.menuList[i] && response.data.menuList[i].menuNm) {
          let item = response.data.menuList[i];
          response.data.menuList[i]({ 'menuId': item.menuId, 'menuNm': item.menuNm, 'price': item.price })
        } else {
          response.data.menuList.push({ 'menuId': i, 'menuNm': '', 'price': '' })
        }
      }
      setFormData(response.data)
    } else {
      setFormData({})
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    if (franchiseAdminMain) {
      _getAdminFranchisesList();
    } else {
      _getAdminFranchiseInfo(currentData ? currentData.franchiseId : 0);
    }
  }, [franchiseAdminMain, currentData])

  useEffect(() => {
    if (fileData) {
      console.log("aa")
      console.log(Base64.encode(fileData))
      setFormData((formData) => ({
        ...formData,
        ['logoImg']: Base64.encode(fileData)
      }));
    }

  }, [fileData])

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
    await putAdminFranchise(JSON.stringify(formData), formData.franchiseId); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

    }
  };

  const _handleSubmit = (values: cafe) => {
    console.log(values); // log the form data to the console
    // submit the form data to a backend API
  };


  return (
    <Container>
      {franchiseAdminMain ?
        <Row>
          {franchiseData.map((data) => (
            <Col md={2} key={data.franchiseId}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
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
        <Formik
          initialValues={formData}
          validationSchema={schema}
          onSubmit={_handleSubmit}
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
                    isValid={touched.franchiseNm && !errors.franchiseNm}
                  />
                  <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
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
                    isValid={touched[0]?.discountAmt && !errors[0]?.discountAmt}
                  />
                  <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              {formData && formData.menuList && formData.menuList.map((item, i) => (
                <Row className="mb-6" key={i}>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId= {i + "formikVal_menu"} 
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
                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
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
                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
              ))}
              <Row>
                <Form.Group className="position-relative mb-3">
                  <Form.Label>로고</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="logoImg"
                    value={formData.logoImg || ''}
                    onChange={handleChange}
                    //onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    // console.log(event.target)
                    // if (event.target.files && event.target.files[0]) {
                    //   const reader = new FileReader();
                    //   reader.readAsDataURL(event.target.files[0]);
                    //   reader.onloadend = (e) => {
                    //     if (e.target && typeof e.target.result === 'string') {
                    //       setFileData(e.target.result);
                    //     }
                    //   };

                    //   // reader.onloadend = (e : any) => {
                    //   //   if (e.target && e.target.result) {
                    //   //     console.log(e.target.result)
                    //   //     setFormData((prevFormData) => ({
                    //   //       ...prevFormData,
                    //   //       //[event.target.name]: Base64.encode(e.target.result),
                    //   //       [event.target.name]: '멜롱'
                    //   //     }));
                    //   //   }
                    //   // };
                    // }
                    //}}
                    isInvalid={!!errors.logoImg}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.logoImg}
                  </Form.Control.Feedback>
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
                  value={formData.useYn}
                  isInvalid={!!errors.useYn}
                  feedback={errors.useYn}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      }
    </Container>
  );
};

export default FranchiseManagement;
