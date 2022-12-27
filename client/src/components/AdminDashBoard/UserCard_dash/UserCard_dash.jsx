import React from "react";
import "./UserCard_dash.css";

// Components
import BlockIcon from "@material-ui/icons/Block";

const UserCard_dash = ({ id, name, last_name, email, dni }) => {
  const handleBlock = () => {
    fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="user-dash-card">
      <div className="user-dash-id">
        <p>{id}</p>
      </div>
      <div className="user-dash-name">
        <p>{name}</p>
      </div>
      <div className="user-dash-last_name">
        <p>{last_name}</p>
      </div>
      <div className="user-dash-email">
        <p>{email}</p>
      </div>
      <div className="user-dash-dni">
        <p>{`${dni || "No DNI"}`}</p>
      </div>
      <div className="dash-card-icons">
        <div className="card-dash-icon">
          <BlockIcon onClick={handleBlock} />
        </div>
      </div>
    </div>
  );
};

export default UserCard_dash;
