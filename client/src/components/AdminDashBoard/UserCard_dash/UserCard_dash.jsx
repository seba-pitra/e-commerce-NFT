import React from "react";
import "./UserCard_dash.css";

const UserCard_dash = ({ id, name, last_name, email, dni }) => {
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
    </div>
  );
};

export default UserCard_dash;
