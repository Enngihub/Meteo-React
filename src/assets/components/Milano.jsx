import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import backgroundImage from "../img/milano.jpg";
import { useState, useEffect } from "react";
function Milano() {
  const [Meteo, setMeteo] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=milano&appid=aa6354ec4cfda784e7dcdf2964902721&units=metric&lang=it`
        );
        const data = await response.json();
        setMeteo(data);
      } catch (err) {
        console.error("Errore nel recupero dei dati:", err);
      }
    };
    fetchMeteo();
  }, []);
  if (!Meteo) {
    return <div>Caricamento..</div>;
  }
  const weather = Meteo.weather ? Meteo.weather[0] : null;
  const temperature = Meteo.main ? Meteo.main.temp : null;
  return (
    <Container>
      <Row className=" justify-content-center align-content-center">
        <Col className=" justify-content-center align-content-center">
          <div
            className="rounded-5 mt-5 text-center p-5"
            style={{
              backgroundImage: "url(" + backgroundImage + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className=" justify-content-center">
              <h1 className="text-light">{Meteo.name}</h1>
              <h2 className="text-light">
                {weather.description.charAt(0).toUpperCase() +
                  weather.description.slice(1)}
              </h2>
              <p className="text-light"> Temperatura : {Meteo.main.temp}°C</p>
              <Button variant="primary" onClick={handleShow}>
                Mostra dettagli
              </Button>

              <Modal
                className="text-center"
                show={show}
                onHide={handleClose}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Dettagli</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Max:{Meteo.main.temp_max}°C</p>
                  <p>Min:{Meteo.main.temp_min}°C</p>
                  <p>Wind speed: {Meteo.wind.speed}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Milano;
