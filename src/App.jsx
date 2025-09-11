import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./assets/components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import Milano from "./assets/components/Milano";
import Roma from "./assets/components/Roma";
import Firenze from "./assets/components/Firenze";
import Footer from "./assets/components/Footer";
import AllWeather from "./assets/components/AllWeather";

import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Row className=" bg-black">
        <Col>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Milano />
                  <Roma />
                  <Firenze />
                </>
              }
            />

            <Route path="/allweather" element={<AllWeather />} />
            <Route
              path="*"
              element={
                <div className="text-light text-center">Work in progress..</div>
              }
            />
          </Routes>
          <Footer />
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
