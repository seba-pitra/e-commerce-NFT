// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Details from './components/Details/Details';
import NotFoundException from './components/404Page/404Page';
import { Route, Switch } from 'react-router-dom';
import NFTNav from './components/NFTNav/NFTNav';


function App() {
  return (
    <div className='App'>
      <NFTNav />
      <Switch>
      <Route exact path='/' render={()=><LandingPage/>} />
      <Route path='/home' render={()=><HomePage/>} />
        {/* <Route exact path='/' render={()=><LandingPage/>} />
            <Route path='/home' render={()=><HomePage/>} />
            <Route path='/details/:id' render={({match}) => <Details match={match}/>}/>
            <Route component={NotFoundException}/> */}
      </Switch>
    </div>
  );
}

export default App;
