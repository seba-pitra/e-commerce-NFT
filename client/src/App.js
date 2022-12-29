// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Details from "./components/Details/Details";
import NotFoundException from "./components/404Page/404Page";
import { Route, Switch } from "react-router-dom";
import NFTNav from "./components/NFTNav/NFTNav";
import Footer from "./components/Footer/Footer";
import CreateNft from "./components/CreateNft/CreateNft";
import UserProfile from "./components/UserComponents/UserProfile/UserProfile.jsx";
import AdminDashboard from "./components/AdminDashBoard/AdminDashboard";
import Register from "./components/Registrer/Registrer";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import DeveloperTeam from "./components/DeveloperTeam/DeveloperTeam";
import Collections from "./components/Collections/Collections.jsx";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail.jsx";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Recovery from "./components/Recovery/Recovery";
import PayResult from "./components/PayResult/PayResult";
import { getLoggedUser, GET_LOGGED_USER } from "./redux/actions";
import { useDispatch } from "react-redux";
import UserDetail from "./components/UserComponents/UserProfile/UserDetail.jsx";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getLoggedUser(auth.currentUser.uid));
      console.log("Estoy loggeadi");
      localStorage.setItem("Logged", "Estoy loggeado");
    } else {
      console.log("NO estoy loggeado");
      dispatch({ type: GET_LOGGED_USER, payload: {} });
      localStorage.setItem("Logged", "No loggeadoX2");
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
          <Route exact path="/createNft" render={() => <CreateNft />} />
          <Route exact path="/pay/success" render={() => <PayResult />} />
          <Route exact path="/pay/failure" render={() => <PayResult />} />
          <Route exact path="/pay/pending" render={() => <PayResult />} />
          <Route
            exact
            path="/user/:id"
            render={({ match }) => <UserProfile match={match} />}
          />
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
    </div>
  );
}

export default App;
