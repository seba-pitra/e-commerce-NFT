import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
//import "./Mycollections.module.css";
import VerifiedIcon from "@mui/icons-material/Verified";

import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkCollections.module.css"
import lightStyles from "./stylesheets/LightCollections.module.css"
import { useLoggedUser } from "../../customHooks/useLoggedUser"





function Mycollections() {
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const isLoading = useSelector((state) => state.isLoading);
  const styles = useStyles(darkStyles, lightStyles);

 // -------------------
  console.log(loggedUser.collections);
 // -------------------



  const collectionsCards =
    loggedUser.collections &&
    loggedUser.collections.map((collection) => {
      
	    return (

 <Link to={`/collections/${collection.id}`} className={styles["link"]}>

		    <div className={styles["collections-container"]}>
		    <img
		    className={styles["collections-img-main"]}
		    src="https://res.cloudinary.com/dwyhztlkw/image/upload/v1673373417/xx83ajscnftifvyajlrj.jpg"
		    alt="img-collections"
		    />
		    <div className={styles["img-name-container"]}>
		    <img
		    className={styles["collections-img-owner"]}
		    src="https://res.cloudinary.com/dwyhztlkw/image/upload/v1673373417/xx83ajscnftifvyajlrj.jpg"
		    alt="img-collections"
		    />

		    

<div>
		    <div className={styles["collection-name-container"]}>
		    <VerifiedIcon />
		    <h3 className={styles["collections-name"]}>
		    {collection.name}
		    </h3>
		    </div>
		    <div className={styles["collection-name-container"]}>
		    <h3 className={styles["collections-name"]}>
		    Contract: {collection.contract}
		    </h3>
		    </div>
		    </div>
		    </div>
		    </div>
<hr></hr>
</Link>


	    );
    }

    );

  return (
    <div className="conteiner-main-collections">
      {isLoading ? <Loading /> : collectionsCards}
    </div>
  );
}

export default Mycollections;
