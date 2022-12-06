import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Details from './components/Details/Details';
import NotFoundException from './components/404Page/404Page';

import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';


function App() {
  return (
    <div className='App'>
      <Nav />
      <Switch>
        {/* <Route exact path='/' render={()=><LandingPage/>} />
        <Route path='/home' render={()=><HomePage/>} />
        <Route path='/details/:id' render={({match}) => <Details match={match}/>}/>
        <Route component={NotFoundException}/> */}
      </Switch>
    </div>
  );
}

export default App;
