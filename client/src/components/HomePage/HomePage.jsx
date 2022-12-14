import CardCarousel1 from "./Carousel/Carousel-views";
import CardCarousel2 from "./Carousel/Carousel-stars";
import CardCarousel3 from "./Carousel/Carousel-rarity";
import CollectionCarousel from "./Carousel/Collections-home.jsx";
import CollectionTable from "./Carousel/Collections-table.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../redux/actions";
import UncontrolledExample from "./Carousel/Carousel.jsx";

import styles from "./stylesheets/HomePage.module.css";

function HomePage() {
  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllNfts());
    dispatch(actions.getEthPrice());
    dispatch(actions.getAllCollections());
  }, [dispatch]);

  // VIEWS
  let nftsMostViews = nfts.sort((nftA, nftB) => {
    if (nftA.favs > nftB.favs) return -1;
    if (nftB.favs > nftA.favs) return 1;
    return 0;
  });
  nftsMostViews = nftsMostViews.slice(0, 16);

  // STARS
  let nftsMostStars = nfts.sort((nftA, nftB) => {
    if (nftA.stars > nftB.stars) return -1;
    if (nftB.stars > nftA.stars) return 1;
    return 0;
  });
  nftsMostStars = nftsMostStars.slice(0, 16);

  // RARITY
  let nftsMostRarity = nfts.sort((nftA, nftB) => {
    if (nftA.rarity > nftB.rarity) return -1;
    if (nftB.rarity > nftA.rarity) return 1;
    return 0;
  });
  nftsMostRarity = nftsMostRarity.slice(0, 16);

  // COLLECTIONS
  let collectionsSlice = collections.slice(0, 10);

  return (
    <div className={styles["main-container-homepage"]}>
      <span className={styles["verification-msj"]}>
        If you want to sell nfts you must verify your account
      </span>

      <div className={styles["main-carousel-images"]}>
        <UncontrolledExample />
      </div>

      <h1>Explore, collect and sell NFTs</h1>

      <div className={styles["container-nfts"]}>
        <CollectionCarousel cards={collectionsSlice} />
      </div>

      <div className={styles["container-nfts"]}>
        <CollectionTable cards={collectionsSlice} />
      </div>

      <div className={styles["container-nfts"]}>
        <CardCarousel1 cards={nftsMostViews} />
      </div>

      <div className={styles["container-nfts"]}>
        <CardCarousel2 cards={nftsMostStars} />
      </div>

      <div className={styles["container-nfts"]}>
        <CardCarousel3 cards={nftsMostRarity} />
      </div>
    </div>
  );
}

export default HomePage;
