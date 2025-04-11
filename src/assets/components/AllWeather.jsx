import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
const città = ["Milano", "Roma", "Firenze", "Pisa", "Cagliari", "Bolzano"];
function AllWeather() {
  const [meteoData, setMeteoData] = useState([]);
  useEffect(() => {
    const fetchmeteo = async () => {
      try {
        const promises = città.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa6354ec4cfda784e7dcdf2964902721&units=metric&lang=it`
          );
          const data = await response.json();
          return data;
        });
        const results = await Promise.all(promises);
        setMeteoData(results);
      } catch (err) {
        console.error("Errore nel recupero dati:", err);
      }
    };
    fetchmeteo();
  }, []);
  return (
    <Container className="mt-5">
      <Row>
        {meteoData.map((meteo, index) => {
          const weather = meteo.weather[0];
          return (
            <Col key={index} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                  className="w-25"
                />
                <Card.Body>
                  <Card.Title>{meteo.name}</Card.Title>
                  <Card.Text>
                    {weather.description.charAt(0).toUpperCase() +
                      weather.description.slice(1)}
                    <br />
                    Temperatura: {meteo.main.temp}°C
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default AllWeather;
