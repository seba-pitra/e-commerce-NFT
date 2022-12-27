import * as actions from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import "./UserProfile.css";

export default function UserProfile(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);
  const { userDetail } = useSelector((state) => state);
  console.log(id);

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

  useEffect(() => {
    dispatch(actions.getUserByID(id));
  }, [dispatch, id]);
  console.log(userData);
  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="avatar-nickname-container">
          <img src={userDetail.profile_pic} alt="avatar" />
          {/* falta nombre de usuario  */}
          <p className="text-muted mb-1">NOMBRE DE USARIO</p>
        </div>

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
                  {userDetail.mobile ? userDetail.mobile : "No mobile founded"}
                </h6>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="functionalities-history-container">
      <div className="available-functionalities">
        {/* aca estaria bueno marcar que cosas puede hacer este tipo de usuario:
        si es admin que diga
        disponible informacion de usuarios
        historial de compras de usuarios
        actualizar tipo de usuario
        etc */}

      </div>
      <div className="history">
        {/* <HistoryPurchase/> */}
      </div>
      </div>
      
    </div>
  );
}
