import "./bootstrap/bootstrap.css";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";
export default function App() {
  const [getText, setText] = useState({});

  useEffect(() => {
    axios.get("./text.json").then((response) => setText(response.data));
  }, [getText]);

  return (
    <Container fluid className="App text-center ">
      <h2 className="my-3 position-relative z-2">Отзывы наших клиентов</h2>
      <Container>
        <Col className="position-relative">
          <div className="item item-left position-absolute">
            <h4 className="text-center py-2">Дима</h4>
            <div className="column-5">
              <img className="star" src="./storage/img/star.png" />
              <img className="star" src="./storage/img/star.png" />
              <img className="star" src="./storage/img/star.png" />
              <img className="star" src="./storage/img/star.png" />
              <img className="star" src="./storage/img/star.png" />
            </div>
            {getText.txt}
          </div>
          <div className="item item-center position-absolute  active">
            <h4 className="text-center py-2">Дима</h4>
            {getText.txt}
          </div>
          <div className="item item-right position-absolute">
            <h4 className="text-center py-2">Дима</h4>
            {getText.txt}
          </div>
        </Col>
      </Container>
      <div className="rview-bg"></div>
      <div className="reviews"></div>
      <div className="btn btn-left position-absolute margin-auto">
        <ArrowLeft />
      </div>
      <div className="btn btn-right position-absolute margin-auto">
        <ArrowRight />
      </div>
    </Container>
  );
}
