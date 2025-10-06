import {
  Nav,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function NavBar() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const abortRef = useRef(null);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=&appid=aa6354ec4cfda784e7dcdf2964902721&units=metric&lang=it`;
  const fetchCity = async (city) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa6354ec4cfda784e7dcdf2964902721&units=metric&lang=it`;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setResult(json);
      setOpen(true);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError(e.message || "Errore di rete");
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (term) fetchCity(term);
  };

  const cityName =
    result?.name ?? result?.city ?? result?.location ?? "Risultato";
  const temperature =
    result?.main?.temp ?? result?.temperature ?? result?.current?.temp ?? null;
  const weatherObj =
    (result?.weather && result.weather[0]) ||
    result?.current?.weather ||
    result?.condition ||
    null;
  const description =
    (typeof weatherObj?.description === "string" && weatherObj.description) ||
    (typeof weatherObj?.text === "string" && weatherObj.text) ||
    "";

  const iconCode = weatherObj?.icon;
  const iconUrl = iconCode?.startsWith("http")
    ? iconCode
    : iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  const renderResultPanel = () => {
    if (!open) return null;

    const niceDesc = description
      ? description.charAt(0).toUpperCase() + description.slice(1)
      : "—";
    const niceTemp =
      typeof temperature === "number"
        ? `${Math.round(temperature)}°C`
        : temperature || "—";

    return (
      <div className="position-relative">
        <Card
          className="position-absolute end-0 mt-2"
          style={{ minWidth: 300, zIndex: 1030 }}
        >
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title className="mb-0">{cityName}</Card.Title>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
              >
                ✕
              </Button>
            </div>

            {loading && (
              <div className="d-flex align-items-center mt-2">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Caricamento…</span>
              </div>
            )}

            {!!error && (
              <Alert variant="danger" className="mt-2 mb-0">
                {error}
              </Alert>
            )}

            {!loading && !error && result && (
              <div className="mt-2">
                {iconUrl && (
                  <img
                    src={iconUrl}
                    alt={description || "Icona meteo"}
                    width={64}
                    height={64}
                    style={{ objectFit: "contain" }}
                  />
                )}
                <div className="mt-2">
                  <div className="fw-semibold">{niceDesc}</div>
                  <div>Temperatura: {niceTemp}</div>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div className="m-5 border rounded-5 p-3 border-light">
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <i className="bi bi-sun-fill text-warning fs-3 ms-3"></i>
        </Col>

        <Col className="d-flex align-items-center justify-content-start">
          <Nav>
            <Link to="/" className="text-light me-4 mt-2">
              Home
            </Link>

            <Link to="/allweather" className="text-light me-4 mt-2">
              All Weather
            </Link>
            <Link to="/about" className="text-light mt-2">
              About Us
            </Link>
          </Nav>
        </Col>

        <Col xs="auto">
          <div className="position-relative">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Cerca città…"
                  className="me-sm-2"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => (result || error) && setOpen(true)}
                />
                <Button type="submit" variant="outline-light">
                  <i className="bi bi-search" />
                </Button>
              </InputGroup>
            </Form>

            {renderResultPanel()}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NavBar;
