import Carousel from "react-bootstrap/Carousel";
import img1 from "../../../images/home-img/home-img-1.jpg";
import img2 from "../../../images/home-img/home-img-2.jpg";
import img3 from "../../../images/home-img/home-img-3.jpg";

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img style={{filter: 'brightness(50%)'}} className="d-block w-100" src={img3} alt="Third slide" />
        <Carousel.Caption>
          <h2>WELCOME TO NON FUNGIBLE TOWN</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <img style={{filter: 'brightness(50%)'}} className="d-block w-100" src={img1} alt="First slide" />
        <Carousel.Caption>
          <h2>WE ACCEPT METAMASK AND MERCADO PAGO</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{filter: 'brightness(50%)'}} className="d-block w-100" src={img2} alt="Second slide" />
        <Carousel.Caption>
          <h2>LOWERST COMISSIONS IN THE MARKET</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
