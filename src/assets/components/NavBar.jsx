import { Nav, Button, Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="m-5">
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <Nav>
            <Link to="/" className="text-light me-4 mt-2">
              Home
            </Link>

            <Link to="/allweather" className="text-light me-4 mt-2">
              All Weather
            </Link>

            <Link to="*" className="text-light mt-2">
              About Us
            </Link>
          </Nav>
        </Col>

        <Col xs="auto">
          <Row className="d-flex justify-content-end">
            <Col xs="auto">
              {/* IL SEARCH NON FUNZIONA */}
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-sm-2"
              />
            </Col>
            <Col xs="auto"></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default NavBar;
