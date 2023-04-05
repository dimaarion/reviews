import "./styles.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";
export default function App() {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const [getText, setText] = useState([{}]);
  const [load, setLoad] = useState(0);
  const [count, setCount] = useState(0);
  const [lang, setLang] = useState("ro");

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    arr = arr.filter((f)=>f.review_display === 1)
   
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  function arrCount(n) {
    let a = [];
    for (let i = 0; i < n; i++) {
      a[i] = i;
    }
    return a;
  }
  useEffect(() => {
    let countArr = 3;
    if (windowWidth.current < 1000) {
      countArr = 1;
    }
    setLang(document.querySelector("html").lang);
    axios
      .get("https://sandaniprim.md/reviews/")
      .then((response) => setText(sliceIntoChunks(response.data, countArr)));
  }, [setText]);

  useEffect(()=>{
   // console.log(getText)
  },[getText])
  return (
    <Container
      fluid
      className="text-center position-relative "
      onLoad={() => setLoad(load + 1)}
    >
      <h2 className="py-3 position-relative z-2  text-dark text-center fs-2 fw-bold text-uppercase">
        {lang === "ru"
          ? "Отзывы наших клиентов"
          : "Recenziile clienților noștri"}
      </h2>

      <Container>
        <Col className="position-relative">
          {getText
            .sort((a, b) => a > b)
            .map((items, i) => (
              <Row
                key={i}
                className={
                  i == count
                    ? "item position-absolute active"
                    : "item position-absolute"
                }
              >
                {items.length > 0
                  ? items.map((item, i) => (
                      <Col key={item.review_name + i} className="bg-light mx-2 pb-2">
                        <h4 className="text-center py-2">{item.review_name}</h4>
                        <Row>
                          <Col>
                            <div className="raund">
                              {arrCount(5).map((raund) =>
                                item.review_raund > raund ? (
                                  <img
                                    key={raund + "r"}
                                    className="star"
                                    src="./storage/img/starActive.png"
                                  />
                                ) : (
                                  <img
                                    key={raund + "r"}
                                    className="star"
                                    src="./storage/img/star.png"
                                  />
                                )
                              )}
                            </div>
                          </Col>
                          <Col className="text-end">{item.review_data}</Col>
                        </Row>
                        {item.review_content}
                      </Col>
                    ))
                  : ""}
              </Row>
            ))}
        </Col>
      </Container>
      <div className="rview-bg"></div>
      <div className="reviews"></div>
      {getText.length > 1 ? (
        <div>
          <div
            onClick={() =>
              0 < count ? setCount(count - 1) : setCount(getText.length - 1)
            }
            className="btn-reviews btn-left position-absolute margin-auto"
          >
            <ArrowLeft />
          </div>
          <div
            onClick={() =>
              getText.length - 1 > count ? setCount(count + 1) : setCount(0)
            }
            className="btn-reviews btn-right position-absolute margin-auto"
          >
            <ArrowRight />
          </div>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
