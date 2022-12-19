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
import AdminDashboard from "./components/AdminDashBoard/AdminDashboard";
import Register from "./components/Registrer/Registrer";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import DeveloperTeam from "./components/DeveloperTeam/DeveloperTeam";
import Collections from "./components/Collections/Collections.jsx";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  return (
    <div className="App">
      <NFTNav />
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route path="/home" render={() => <HomePage />} />
        <Route path="/createNft" render={() => <CreateNft />} />
        <Route
          path="/details/:id"
          render={({ match }) => <Details match={match} />}
        />
        <Route path="/test/dashboard" render={() => <AdminDashboard />} />
        <Route component={NotFoundException} />
      </Switch>
      <NFTNav></NFTNav>
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <LandingPage loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/home"
            render={() => <HomePage loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/registrer"
            render={() => <Register loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/marketplace"
            render={() => <MarketPlace loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/collections"
            render={() => <Collections loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/developerTeam"
            render={() => <DeveloperTeam loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/createNft"
            render={() => <CreateNft loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/details/:id"
            render={({ match }) => <Details match={match} />}
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
