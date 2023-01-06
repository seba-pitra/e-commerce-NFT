import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import PurchaseHistory from "../../PurchaseHistory/PurchaseHistory";
import EditUserInfo from './../EditUserInfo'
import { Link } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  let [edit, setEdit] = useState({
    state: false,
  });

  let handleEdit = () => {
    setEdit(() => ({ state: true }));
  };
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
  const userDetail = useSelector((state) => state.loggedUser);
  // const { userDetail } = useSelector((state) => state);

  // FALTA TRAER EL COMPONENTE PurchaseHistory y pasarle por params las relaciones con buy para q muestre el historial

  // NO HACE FALTA LO DE EDITAR TYPE porque este es el componente de user normal,no puede cambair de normal a admin

  //   const [edit, setEdit] = useState(false);
  //   const [type, setType] = useState("");
  //   const [update, setUpdate] = useState(false);
  //   const handleteEdit = (e) => {
  //     e.preventDefault();
  //     setEdit(!edit);
  //   };

  //   const handleTypeChange = (e) => {
  //     setType(e.target.value);
  //   };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     let body = {
  //       type: type,
  //     };
  //     dispatch(actions.updateUser(id, body)).then((data) => {
  //       setUpdate(!update);
  //       setEdit(!edit);
  //     });
  //   };

  useEffect(() => {}, [dispatch]);
  console.log(userDetail)
  return (
    <div className="main-container">
      <button onClick={() => navHistory.goBack()} className="back-button">
        {" "}
        {"< "}Back{" "}
      </button>
      <div className="profile-container">
        <div className="avatar-nickname-container">
          <img
            className="profile-pic"
            src={userDetail.profile_pic}
            alt="avatar"
            referrerpolicy="no-referrer"
          />
          {/* falta nombre de usuario  */}
          <p className="text-muted mb-1">NOMBRE DE USARIO</p>
          <img
            className="edit-info"
            src={
              "https://iconsplace.com/wp-content/uploads/_icons/ffc0cb/256/png/edit-icon-12-256.png"
            }
            alt="edit-info"
            referrerpolicy="no-referrer"
            onClick={() => {
              handleEdit();
            }}
          />
        </div>
        {edit.state ? (
          <EditUserInfo 
          name ={userDetail.name}
          last_name ={userDetail.last_name}
          email ={userDetail.email}
          age ={userDetail.age}
          phone ={userDetail.phone}
          mobile ={userDetail.mobile}/>
        ) : (
          <div className="user-info">
            <div className="info">
              <h6>Full Name</h6>
              <h6 className="text-muted">
                {userDetail.name} {userDetail.last_name}
              </h6>
            </div>
            <div className="info">
              <h6>Email</h6>
              <h6 className="text-muted">{userDetail.email}</h6>
            </div>
            <div className="info">
              <h6>Age</h6>
              <h6 className="text-muted">
                {userDetail.age ? userDetail.age : "No age founded"}
              </h6>
            </div>

            <div className="info">
              <h6>Type</h6>
              <h6 className="text-muted">{userDetail.type}</h6>

              <div className="info">
                <h6>Phone</h6>
                <h6 className="text-muted">
                  {userDetail.phone ? userDetail.phone : "No phone founded"}
                </h6>

                <div className="info">
                  <h6>Mobile-Phone</h6>
                  <h6 className="text-muted">
                    {userDetail.mobile
                      ? userDetail.mobile
                      : "No mobile founded"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="functionalities-history-container">
        <div className="available-functionalities">
          {/* aca estaria bueno marcar que cosas puede hacer este tipo de usuario:
        si es admin que diga
        disponible informacion de usuarios
        historial de compras de usuarios
        actualizar tipo de usuario
        etc */}
          <h6>2 NFT's bought</h6>
          <h6>You dont have permitions to create an NFT ,you need to upgrade your account</h6>
          <Link to="/myAccount/verify">
            <div className="upgrade-button">Upgrade to Premium</div>
          </Link>

        </div>
        <div className="history">
          <PurchaseHistory props={history} />
        </div>
      </div>
    </div>
  );
}
