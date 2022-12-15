// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Details from './components/Details/Details';
import NotFoundException from './components/404Page/404Page';
import { Route, Switch } from 'react-router-dom';
import NFTNav from './components/NFTNav/NFTNav';
import Footer from './components/Footer/Footer';
import CreateNft from './components/CreateNft/CreateNft';

import Register from './components/Registrer/Registrer';

import MarketPlace from './components/MarketPlace/MarketPlace';
import Collections from './components/Collections/Collections.jsx';

function App() {
  return (
    <div className='App'>
      <NFTNav></NFTNav>
      <React.Fragment>
        <Switch>
          <Route exact path='/' render={()=><LandingPage/>} />
          <Route exact path='/home' render={()=><HomePage/>} />

          <Route exact path='/registrer' render={()=><Register/>} />

          <Route exact path='/marketplace' render={()=><MarketPlace/>} /> 
          <Route exact path='/collections' render={()=><Collections/>} />

          <Route exact path='/createNft' render={()=><CreateNft/>} />
          <Route exact path='/details/:id' render={({match}) => <Details match={match}/>}/>
          <Route render={()=>{<NotFoundException/>}}/>
        </Switch>
      </React.Fragment>
      <Footer />
    </div>
  );
}

export default App;
