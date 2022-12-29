import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const order = useSelector((state) => state.orderDirection);
//  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();
let loginStatusStorage = localStorage.getItem("Logged");

  // useEffect(() => {
  //     dispatch(actions.getAllNfts());
  //     dispatch(actions.getAllCollections())
  // },[dispatch]);

  useEffect(() => {}, [order]);

  useEffect(() => {
    validateUser();
  }, [dispatch]);
  const validateUser = async () => {
    if (loginStatusStorage) {
      dispatch(actions.getAllNfts());
      dispatch(actions.getAllCollections());
    } else {
      history.push("/");
    }
  };

  return (
    <>
      {/* <div className='carrousel1'>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="https://www.criptonoticias.com/wp-content/uploads/2022/11/NFT-BINANCE-1140x570.jpg" className="d-block w-100" alt="nft1"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://ayudaleyprotecciondatos.es/wp-content/uploads/2021/04/ntf-00.jpg" className="d-block w-100" alt="nft2"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="https://s32679.pcdn.co/wp-content/uploads/2022/10/NFT-Apple-BIC-ES-850x478.png.webp" className="d-block w-100" alt="nft3"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </div>
        <section class="slider-section">
		<h1 class="title">Fewer Items </h1>
		<div class="slider-container">
			<ol class="cards slider">					
				<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a href="#">
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 1</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a>
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 2</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a href="#">
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 3</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a>
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 4</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
				<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a href="#">
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 5</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a>
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 6</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a href="#">
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 7</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
					<li class="card-outter slider-item js-slider-item">
						<div class="card">
							<a>
								<img src="https://unsplash.it/210/100"/>
								<h2 class="title">Item 8</h2>
								<p class="description">Item description</p>
							</a>	
						</div>
					</li>
			</ol>
			<div class="slider-indicator-bar js-slider-indicator-bar">
				<div class="slider-indicator js-slider-indicator"></div>
			</div>
			<span class="js-slider-arrow slider-arrow left disabled"></span>
			<span class="js-slider-arrow slider-arrow right"></span>
		</div>
	</section> */}
    </>
  );
}

export default HomePage;
