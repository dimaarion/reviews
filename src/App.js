import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [getImage, setImage] = useState([{}]);

  useEffect(() => {
    axios.get("./image.json").then((response) => setImage(response.data));
  }, [getImage]);

  return (
    <div className="App">
      <h2>Отзывы наших клиентов</h2>
      <div className="row">
        {getImage.map((image, i) => (
          <div className="col" key={image.name + i}>
            {image.name}
          </div>
        ))}
      </div>
    </div>
  );
}
