import { Container, Row, Col, Card } from 'react-bootstrap';

const FranchiseManagement = () => {

  const dataArray = [
    { id: 1, name: 'Item 1', description: 'This is item 1.' },
    { id: 2, name: 'Item 2', description: 'This is item 2.' },
    { id: 3, name: 'Item 3', description: 'This is item 3.' },
  ];


  return (
    <Container>
      <Row>
        {dataArray.map((data) => (
          <Col md={4} key={data.id}>
            <Card>
              <Card.Body onClick ={() => console.log(data)}>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FranchiseManagement;
