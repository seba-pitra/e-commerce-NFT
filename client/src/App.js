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
import Register from "./components/Registrer/Registrer";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import DeveloperTeam from "./components/DeveloperTeam/DeveloperTeam";
import Collections from "./components/Collections/Collections.jsx";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail.jsx";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Recovery from "./components/Recovery/Recovery";
import PayResult from "./components/PayResult/PayResult";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className="App">
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
            path="/recovery"
            render={() => <Recovery loggedIn={loggedIn} />}
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
            path="/collections/:id"
            render={() => <CollectionDetail loggedIn={loggedIn} />}
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
            path="/pay/success"
            render={() => <PayResult loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/pay/failure"
            render={() => <PayResult loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/pay/pending"
            render={() => <PayResult loggedIn={loggedIn} />}
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
