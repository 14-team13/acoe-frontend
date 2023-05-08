import { Container, Pagination, Table, Button, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';

const CafesManagement = () => {

  interface Option {
    value: string;
    label: string;
  }

  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([])
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectedOptionChange = (event: any) => {
    const option = options.find((o) => o.value === event.target.value) || null;
    setSelectedOption(option);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Input value:', inputValue);
    console.log('Selected option:', selectedOption);
  };

  const handleDelete = (id: number) => {

  }

  return (
    <Container>
      <div className = "flex-row-space mgb10">
        <Button variant="secondary" onClick={() => handleDelete(1)}>등록</Button>
        <div className = "flex-row">
          <Form onSubmit={handleSubmit} className = "flex-row">
            <Form.Group controlId="formBasicSelect">
              <Form.Control as="select" value={selectedOption?.value} onChange={handleSelectedOptionChange}>
                <option value="">Select an option...</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicInput">
              <Form.Control type="text" placeholder="Enter text" value={inputValue} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Control type="submit" value="Search" />
            </Form.Group>
          </Form>
        </div>
      </div>
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
          {data.map((item) => (
            // <tr key={item.id}>
            <tr>
              <td>{item}</td>
              <td>{item}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CafesManagement;
