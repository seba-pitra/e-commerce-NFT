import * as actions from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

export default function UserProfile(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state);

  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("");
  const [update, setUpdate] = useState(false);

  const handleteEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let body = {
      type: type,
    };
    dispatch(actions.updateUser(id, body)).then((data) => {
      setUpdate(!update);
      setEdit(!edit);
    });
  };

  useEffect(() => {
    dispatch(actions.getUserByID(id));
  }, [dispatch, id, update]);
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="py-5">
        <div>
          <div lg="4">
            <div className="mb-4">
              <div className="text-center">
                {/* Imagen proximamente */}
                {
                  /* <img
                //   src={"/*userData.avatar*/
                  //"}
                  //   alt="avatar"
                  //   className="rounded-circle"
                  //   style={{ width: "150px" }}
                  //   fluid
                  //>*/}
                }

                <p className="text-muted mb-1">{`${userDetail.name} ${userDetail.last_name}`}</p>
                <div className="d-flex justify-content-center mb-2"></div>
              </div>
            </div>
          </div>
          <div lg="8">
            <div className="mb-4">
              <div>
                <div>
                  <div sm="3">
                    <div>Full Name</div>
                  </div>
                  <div sm="9">
                    <div className="text-muted">{`${userDetail.name} ${userDetail.last_name}`}</div>
                  </div>
                </div>
                <hr />
                <div>
                  <div sm="3">
                    <div>Email</div>
                  </div>
                  <div sm="9">
                    <div className="text-muted">{`${userDetail.email}`}</div>
                  </div>
                </div>
                <hr />
                <div>
                  <div sm="3">
                    <div>Age</div>
                  </div>
                  <div sm="9">
                    <div className="text-muted">{`${userDetail.age}`}</div>
                  </div>
                </div>
                <hr />
                <div>
                  <div sm="3">
                    <div>Type</div>
                  </div>
                  <div sm="9">
                    {" "}
                    {edit ? (
                      <div>
                        <select value={type} onChange={handleTypeChange}>
                          <option value="">- Select Type Admin -</option>
                          <option value="Admin">Admin</option>
                          <option value="Medium">Medium</option>
                          <option value="Basic">Basic</option>
                        </select>
                        <div>
                          <DoneIcon onClick={handleUpdate} />
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted">
                        {`${userDetail.type}`}
                        <div>
                          <EditIcon onClick={handleteEdit} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div>
                  <div sm="3">
                    <div>DNI</div>
                  </div>
                  <div sm="9">
                    <div className="text-muted">{`${
                      userDetail.dni ? userDetail.dni : "No DNI"
                    } `}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
