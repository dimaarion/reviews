import "./bootstrap/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
export default function App() {
  const [getImage, setImage] = useState([{}]);

  useEffect(() => {
    axios.get("./image.json").then((response) => setImage(response.data));
  }, [getImage]);

  return (
    <div className="App">
      <h2>Отзывы наших клиентов</h2>
      <Row>
        {getImage.map((image, i) => (
          <Col key={image.name + i}>{image.name}</Col>
        ))}
      </Row>
    </div>
  );
}
