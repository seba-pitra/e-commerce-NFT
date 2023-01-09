import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import CardCarousel1 from "./Carousel/Carousel-views";
import CardCarousel2 from "./Carousel/Carousel-stars";
import CardCarousel3 from "./Carousel/Carousel-rarity";
import CollectionCarousel from "./Carousel/Collections-home.jsx";
import CollectionTable from "./Carousel/Collections-table.jsx";
import UncontrolledExample from "./Carousel/Carousel.jsx";

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

	// STARS
	let nftsMostStars = nfts.sort((nftA, nftB) => {
		if(nftA.stars > nftB.stars) return -1;
		if(nftB.stars > nftA.stars) return 1;
		return 0;
	});
	nftsMostStars = nftsMostStars.slice(0,16)

	// RARITY
	let nftsMostRarity = nfts.sort((nftA, nftB) => {
		if(nftA.rarity > nftB.rarity) return -1;
		if(nftB.rarity > nftA.rarity) return 1;
		return 0;
	});
	nftsMostRarity = nftsMostRarity.slice(0,16)

	// COLLECTIONS
	let collectionsSlice = collections.slice(0,10)
	console.log(collectionsSlice)

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
			
			<span className="verification-msj">If you want to sell nfts you must verify your account</span>

			<div className="main-carousel-images">
				<UncontrolledExample/> 
			</div>

			<h1>Explore, collect and sell NFTs</h1>

			<div className="container-nfts">
				<CollectionCarousel cards={collectionsSlice}/> 
			</div>

			<div className="container-nfts">
				<CollectionTable cards={collectionsSlice}/> 
			</div>


			<div className="container-nfts">
				<CardCarousel1 cards={nftsMostViews}/>
			</div>

			<div className="container-nfts">
				<CardCarousel2 cards={nftsMostStars}/>
			</div>
			
			<div className="container-nfts">
				<CardCarousel3 cards={nftsMostRarity}/>
			</div>
    </div>
  );
}

export default HomePage;
