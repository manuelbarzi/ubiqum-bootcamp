import Landing from './screen/Landing'
import Login from './screen/Login'
import Cities from './screen/Cities'
import CreateAccount from './screen/CreateAccount'
import { BrowserRouter, Route, } from 'react-router-dom'

function App(props) {
  return (
    <BrowserRouter>
      <Route title='linkCreateAccountPage' exact path='/createAccount' component={CreateAccount}/>
      <Route title='linkLandingPage' exact path='/' component={Landing} />
      <Route title='linkCitiesPage' exact path='/cities' component={Cities} />
      <Route title='linkLoginPage' exact path='/login' component={Login} />
    </BrowserRouter>
  );
}

export default App;
