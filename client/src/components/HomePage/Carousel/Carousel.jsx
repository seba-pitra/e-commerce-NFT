import Carousel from "react-bootstrap/Carousel";
import img1 from "../../../images/home-img/home-img-1.jpg";
import img2 from "../../../images/home-img/home-img-2.jpg";
import img3 from "../../../images/home-img/home-img-3.jpg";

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="Third slide" />
        <Carousel.Caption>
          <h1>WELCOME</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="box-image1">
          <img className="d-block w-100" src={img1} alt="First slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
