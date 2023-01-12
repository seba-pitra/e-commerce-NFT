import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoggedUser } from "../../customHooks/useLoggedUser";
import * as actions from "../../redux/actions/index";
// import "./AdminDashboard.css";

import styles from "./stylesheets/AdminDashboard.module.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";
import Charts from "./Charts/BarChart.jsx";
import DoughChart from "./Charts/DougnoutChart.jsx";
import Loading from "../Loading/Loading";

const AdminDashboard = () => {
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser();

  const { adminNfts, adminUsers, collections, shouldUpdate } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllAdminNfts());
    dispatch(actions.getAllAdminUsers());
    dispatch(actions.getAllCollections());
  }, [dispatch, shouldUpdate]);

  if (!adminNfts.length || !adminUsers.length || !collections.length)
    return <Loading />;
  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-barchart"]}>
        <Charts chartNfts={adminNfts} chartCollections={collections} />
      </div>
      <div className={styles["dashboard-users-info-container"]}>
        <div className={styles["dashboard-users-info"]}>
          <div className={styles["dashboard-users"]}>
            <h3>Manage Users</h3>
            <NFTList_dash users={adminUsers} />
          </div>
          <DoughChart users={adminUsers} />
        </div>

        <div className={styles["dasboard-left-side"]}>
          <div className={styles["dashboard-verify"]}>
            <h3>Manage Verifications</h3>
            <NFTList_dash
              verifyingUsers={adminUsers.filter(
                (user) => user.type === "VerificationInProcess"
              )}
            />
          </div>
          <div className={styles["dashboard-nfts"]}>
            <h3>Manage NFTs</h3>
            <NFTList_dash nfts={adminNfts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
