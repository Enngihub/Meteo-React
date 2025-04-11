import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <Container className="bg-black">
      <Row>
        <Col className="text-center mt-5">
          <p className="text-secondary">
            © 2025 Previsioni Meteo. Tutti i diritti riservati.
          </p>
          <p>
            <hr className=" text-black" />
            <a href="/privacy-policy">Privacy Policy</a>
            <hr className=" text-black" />
            <a href="/terms-of-service">Termini di Servizio</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
export default Footer;
