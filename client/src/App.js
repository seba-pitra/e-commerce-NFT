// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
// --- CSS ---
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//---  React imports ---
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// -- Component imports ---
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Details from "./components/Details/Details";
import NotFoundException from "./components/404Page/404Page";
import NFTNav from "./components/NFTNav/NFTNav";
import Footer from "./components/Footer/Footer";
import Create from "./components/Create/Create";
import UserProfile from "./components/UserComponents/UserProfile/UserProfile.jsx";
import AdminDashboard from "./components/AdminDashBoard/AdminDashboard";
import Register from "./components/Registrer/Registrer";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import DeveloperTeam from "./components/DeveloperTeam/DeveloperTeam";
import Collections from "./components/Collections/Collections.jsx";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail.jsx";
import Recovery from "./components/Recovery/Recovery";
import PayResult from "./components/PayResult/PayResult";
import UserVerify from "./components/UserComponents/UserVerify/UserVerify";

// Firebase imports
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

//-- actions imports
import { getLoggedUser, removeLoggedUser } from "./redux/actions";
import UserDetail from "./components/UserComponents/UserProfile/UserDetail.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("loginStatus", "log-in");
    } else {
      localStorage.setItem("loginStatus", "log-out");
    }
  });

  return (
    <div className="App">
      <NFTNav></NFTNav>
      <React.Fragment>
        <Switch>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/registrer" render={() => <Register />} />
          <Route exact path="/recovery" render={() => <Recovery />} />
          <Route exact path="/marketplace" render={() => <MarketPlace />} />
          <Route exact path="/collections" render={() => <Collections />} />
          <Route
            exact
            path="/collections/:id"
            render={() => <CollectionDetail />}
          />
          <Route exact path="/developerTeam" render={() => <DeveloperTeam />} />
          <Route exact path="/createNft" render={() => <Create />} />
          <Route exact path="/myAccount/verify" render={() => <UserVerify />} />
          <Route exact path="/pay/success" render={() => <PayResult />} />
          <Route exact path="/pay/failure" render={() => <PayResult />} />
          <Route exact path="/pay/pending" render={() => <PayResult />} />
          <Route exact path="/myAccount" render={() => <UserProfile />} />
          <Route
            exact
            path="/admin/user/:id"
            render={({ match }) => <UserDetail match={match} />}
          />
          <Route
            exact
            path="/details/:id"
            render={({ match }) => <Details match={match} />}
          />
          <Route
            exact
            path="/admin/adminDashboard"
            render={() => <AdminDashboard />}
          />
          <Route
            render={() => {
              <NotFoundException />;
            }}
          />
        </Switch>
      </React.Fragment>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
