import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import UncontrolledExample from "./Carousel/Carousel";
import "./HomePage.css";
import CardCarousel from "./Carousel/test";

function HomePage() {
	const nfts = useSelector((state) => state.nfts);
	const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  const history = useHistory();
	let loginStatusStorage = localStorage.getItem("Logged");

	useEffect(() => {
			dispatch(actions.getAllNfts());
      dispatch(actions.getEthPrice());
			dispatch(actions.getAllCollections())
	},[dispatch]);

	// VIEWS
	let nftsMostViews = nfts.sort((nftA, nftB) => {
		if(nftA.favs > nftB.favs) return -1;
		if(nftB.favs > nftA.favs) return 1;
		return 0;
	});

	nftsMostViews = nftsMostViews.slice(0,16)

	console.log(nftsMostViews)


	// STARS
	let nftsMostStars = nfts.sort((nftA, nftB) => {
		if(nftA.stars > nftB.stars) return -1;
		if(nftB.stars > nftA.stars) return 1;
		return 0;
	});

	nftsMostStars = nftsMostStars.slice(0,16)

	console.log(nftsMostStars)

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
    <div className="main-container-homepage">
			<div className="testeandoestilospapurri">
				<UncontrolledExample/>
			</div>
			<div className="container-nfts">
				<CardCarousel cards={nftsMostViews}/>
			</div>

			<div className="container-nfts">
				<CardCarousel cards={nftsMostViews}/>
			</div>
			
			<div className="container-nfts">
				<CardCarousel cards={nftsMostViews}/>
			</div>
    </div>
  );
}

export default HomePage;
