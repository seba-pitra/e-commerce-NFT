// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Details from './components/Details/Details';
import NotFoundException from './components/404Page/404Page';
import { Route } from 'react-router-dom';
import NFTNav from './components/NFTNav/NFTNav';
import Footer from './components/Footer/Footer';
import CreateNft from './components/CreateNft/CreateNft';


function App() {
  return (
    <div className='App'>
      <React.Fragment>
      <Route exact path='/' render={()=><LandingPage/>} />
      <Route path='/home' render={()=><NFTNav/>} />
      <Route exact path='/home' render={()=><HomePage/>} />
      <Route exact path='/createNft' render={()=><CreateNft/>} />
      <Route exact path='/details/:id' render={({match}) => <Details match={match}/>}/>
      <Route component={NotFoundException}/>
      </React.Fragment>
      <Footer />
    </div>
  );
}

export default App;
