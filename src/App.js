import "./bootstrap/bootstrap.css";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import ArrowLeft from "./components/ArrowLeft";
export default function App() {
  const [getText, setText] = useState({});

  useEffect(() => {
    axios.get("./text.json").then((response) => setText(response.data));
  }, [getText]);

  return (
    <Container fluid className="App text-center">
      <h2 className="my-3">Отзывы наших клиентов</h2>
      <Container>
        <Col className="position-relative">
          <div className="item item-left position-absolute">{getText.txt}</div>
          <div className="item item-center position-absolute  active">
            {getText.txt}
          </div>
          <div className="item item-right position-absolute">{getText.txt}</div>
          <div className="btn">
            <ArrowLeft />
          </div>
        </Col>
      </Container>
    </Container>
  );
}
