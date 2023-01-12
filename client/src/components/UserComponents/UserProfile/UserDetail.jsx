import * as actions from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import PurchaseHistory from "../../PurchaseHistory/PurchaseHistory";
import { Link } from "react-router-dom";
// import "./UserProfile.css";

import darkStyles from "./stylesheets/DarkUserProfile.module.css";
import lightStyles from "./stylesheets/LightUserProfile.module.css";
import useStyles from "../../../customHooks/useStyles";

export default function UserProfile(props) {
  const styles = useStyles(darkStyles, lightStyles);
  const { id } = useParams();

  let navHistory = useHistory();

  let history = [
    {
      id: "dsnkk242n3kd",
      price: 23,
      contract: "0x000000",
      statusPay: "Successed",
      payMethod: "Metamask",
      purchases: {
        id: "7c24694f-ee92-4473-a6d4-d9d912e3d008",
        name: "Angry Cat #9529",
        description:
          "Angry cat is a cultural identity. A clean collection of 10,000 different cats to build an interesting brand and cat-city.",
        category: [
          "Animal",
          "Cat",
          "Cartoon",
          "2d",
          "Casual",
          "Normal",
          "Flat",
        ],
        image:
          "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4b50079c6412ad50750d1a2413dc0cde169c7e78613f04d4da5f7ee3b599e96dcc952d767fec5fb579de5438a72affd94fd14cba5d7fe423cf1f501fecb2b3f41f0fdf0868aae92124ba81cff5c16f522660b39f46e9da843f19bad685104f2f1a2b1c1936cfce25c08e04851370278223c5e4198f99eda3f3b783c3322e8c56",
        contract: "0xdcf68c8ebb18df1419c7dff17ed33505faf8a20c",
        tokenId: "9529",
        price: 0.25,
        rarity: 1494,
        rarityRank: 245,
        lastBuyValue: 0.29,
        lastBuyTs: 1633157767,
        ownerName: "OpenSea",
        ownerIcon:
          "https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg",
        createdAt: "2022-12-27T21:23:08.798Z",
        updatedAt: "2022-12-27T21:23:09.301Z",
        deletedAt: null,
        userId: "BbSKyKizFvWGpSqkBqCM2ardrkm1",
        collectionId: "0e2b2530-6f1b-472c-8d41-02c80fd0ab1a",
      },
      createdAt: "2022-12-27T21:23:08.798Z",
    },
    {
      id: "dsnkk242n3kd",
      price: 23,
      contract: "0x00000",
      statusPay: "Successed",
      payMethod: "Metamask",
      purchases: {
        id: "7c24694f-ee92-4473-a6d4-d9d912e3d008",
        name: "Angry Cat #9529",
        description:
          "Angry cat is a cultural identity. A clean collection of 10,000 different cats to build an interesting brand and cat-city.",
        category: [
          "Animal",
          "Cat",
          "Cartoon",
          "2d",
          "Casual",
          "Normal",
          "Flat",
        ],
        image:
          "https://api.reservoir.tools/assets/v1?asset=d13dd00e722beffaf6c818fc35b7e75a4b50079c6412ad50750d1a2413dc0cde169c7e78613f04d4da5f7ee3b599e96dcc952d767fec5fb579de5438a72affd94fd14cba5d7fe423cf1f501fecb2b3f41f0fdf0868aae92124ba81cff5c16f522660b39f46e9da843f19bad685104f2f1a2b1c1936cfce25c08e04851370278223c5e4198f99eda3f3b783c3322e8c56",
        contract: "0xdcf68c8ebb18df1419c7dff17ed33505faf8a20c",
        tokenId: "9529",
        price: 0.25,
        rarity: 1494,
        rarityRank: 245,
        lastBuyValue: 0.29,
        lastBuyTs: 1633157767,
        ownerName: "OpenSea",
        ownerIcon:
          "https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg",
        createdAt: "2022-12-27T21:23:08.798Z",
        updatedAt: "2022-12-27T21:23:09.301Z",
        deletedAt: null,
        userId: "BbSKyKizFvWGpSqkBqCM2ardrkm1",
        collectionId: "0e2b2530-6f1b-472c-8d41-02c80fd0ab1a",
      },
      createdAt: "2022-12-27T21:23:08.798Z",
    },
  ];

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetail);

  // FALTA TRAER EL COMPONENTE PurchaseHistory y pasarle por params las relaciones con buy para q muestre el historial

  // NO HACE FALTA LO DE EDITAR TYPE porque este es el componente de user normal,no puede cambair de normal a admin

  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("");
  const [update, setUpdate] = useState(false);
  const handleteEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  useEffect(() => {
    dispatch(actions.getUserByID(id));
  }, [dispatch, id]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let body = {
      id: id,
      type: type,
    };
    dispatch(actions.updateUser(body)).then((data) => {
      setUpdate(!update);
      setEdit(!edit);
    });
  };

  return (
    <div className={styles["user-profile-container"]}>
      <button
        onClick={() => navHistory.goBack()}
        className={styles["back-button"]}
      >
        Back
      </button>
      <div className={styles["profile-container"]}>
        <div className={styles["avatar-nickname-container"]}>
          <img
            src={userDetails.profile_pic}
            alt="avatar"
            className={styles["profile-pic"]}
          />
          {/* falta nombre de usuario  */}
          <p className="text-muted mb-1">NOMBRE DE USARIO</p>
        </div>

        <div className={styles["user-info"]}>
          <div className={styles["info"]}>
            <h6>Full Name</h6>
            <h6 className="text-muted">
              {userDetails.name} {userDetails.last_name}
            </h6>
          </div>
          <div className={styles["info"]}>
            <h6>Email</h6>
            <h6 className="text-muted">{userDetails.email}</h6>
          </div>
          <div className={styles["info"]}>
            <h6>Age</h6>
            <h6 className="text-muted">
              {userDetails.age ? userDetails.age : "No age founded"}
            </h6>
          </div>

          <div className={styles["info"]}>
            <h6>Type</h6>
            {edit ? (
              <div>
                <select value={type} onChange={handleTypeChange}>
                  <option value="">- Select Type Admin -</option>
                  <option value="Admin">Admin</option>
                  <option value="Medium">Verified</option>
                  <option value="Basic">Basic</option>
                </select>
                <div>
                  <DoneIcon onClick={handleUpdate} />
                </div>
              </div>
            ) : (
              <div className="text-muted">
                {`${userDetails.type}`}
                <div>
                  <EditIcon onClick={handleteEdit} />
                </div>
              </div>
            )}

            <div className={styles["info"]}>
              <h6>Phone</h6>
              <h6 className="text-muted">
                {userDetails.phone ? userDetails.phone : "No phone founded"}
              </h6>

              <div className={styles["info"]}>
                <h6>Mobile-Phone</h6>
                <h6 className="text-muted">
                  {userDetails.mobile
                    ? userDetails.mobile
                    : "No mobile founded"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["functionalities-history-container"]}>
        <div className={styles["available-functionalities"]}></div>
        <div className={styles["history-purchases"]}>
          <PurchaseHistory props={history} />
        </div>
      </div>
    </div>
  );
}
