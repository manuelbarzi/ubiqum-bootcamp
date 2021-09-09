import Landing from './components/Landing'
import Cities from './components/Cities'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Itineraries from './components/Itineraries';
import Activities from './components/Activities'
import Register from './components/Register'
import Login from './components/Login'
import jwt_decode from "jwt-decode";


function App() {

  


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/cities' component={Cities} />
          <Route exact path='/itineraries' component={Itineraries} />
          <Route exact path='/activities' component={Activities} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
