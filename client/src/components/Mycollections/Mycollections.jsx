import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import NFTCard2 from "../NFTCard/NFTCard2";

import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkCollections.module.css"
import lightStyles from "./stylesheets/LightCollections.module.css"
import { useLoggedUser } from "../../customHooks/useLoggedUser";

function Mycollections() {
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const isLoading = useSelector((state) => state.isLoading);
  const styles = useStyles(darkStyles, lightStyles);

  const collectionsCards = loggedUser.collections && loggedUser.collections.map((collection) => {
		console.log(loggedUser)
			return (
				<Link to={`/collections/${collection.id}`} className={styles["link"]}>
					<div className={styles["collections-container"]}>
						<img className={styles["collections-img-main"]} src={collection.image} alt="img-collections" />
						<div className={styles["img-name-container"]}>
							<img className={styles["collections-img-owner"]} src="https://res.cloudinary.com/dwyhztlkw/image/upload/v1673373417/xx83ajscnftifvyajlrj.jpg" alt="img-collections" />
							<div className={styles["collection-name-container"]}>
								<VerifiedIcon />
								<h3 className={styles["collections-name"]}> {collection.name} </h3>
							</div>
						</div>
					</div>
				</Link>
				);
			}
    );

		const userNfts = loggedUser.nfts && loggedUser.nfts.map((nft) => {
			console.log(loggedUser)
				return (
						<NFTCard2
							key={nft?.id}
							collectionId={nft?.collectionId}
							contract={nft?.contract}
							id={nft?.id}
							image={nft?.image}
							name={nft?.name}
							price={nft?.price}
							tokenId={nft?.tokenId}
							userId={nft?.userId}
							rarity={nft?.rarity}
							favs={nft?.favs}
							stars={nft?.stars}
							lastBuy={nft?.lastBuyValue || 0.01}
						/>
					);
				}
			);

			console.log(userNfts)
			console.log(collectionsCards);

  return (
    <div className="conteiner-main-collections">
      {isLoading ? <Loading /> : 
			<div className={styles["main-container-collections-nfts"]}>
				<div>
					{collectionsCards && collectionsCards.length > 0 ? 
					<div className={styles["main-container-collections"]}>
						<h3>Your collections</h3>
						<div className={styles["container-collections"]}>
							{collectionsCards}
						</div>
					</div> : <h1>You dont have any collections created</h1> }
				</div>
				<div>
					{userNfts && userNfts.length > 0 ? 
					<div className={styles["main-container-collections"]}>
						<h3>Your Nfts</h3>
						<div className={styles["container-collections"]}>
							{userNfts}
						</div>
					</div> : <h1>You dont have any nft</h1> }
				</div>
			</div>
			}
    </div>
  );
}

export default Mycollections;
