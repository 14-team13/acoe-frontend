import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const  AcoeFooter = () =>  {
  return (
    <footer className = "pd10">
      <Row>
        <Col md={6} className="text-center">
          <p>&copy; 2023 ACOE. All rights reserved.</p>
        </Col>
        <Col md={6} className="text-center">
          <ul className="list-inline">
            <li className="list-inline-item"><a href="acoe/privacy">Privacy</a></li>
            <li className="list-inline-item"><a href="acoe/service">Service</a></li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
}

export default AcoeFooter;